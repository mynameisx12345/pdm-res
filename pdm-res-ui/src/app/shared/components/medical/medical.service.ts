import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MEDICAL_CONDITION, RELATION_CONDITION } from '../../constant/medical.constant';

@Injectable({
  providedIn: 'any'
})
export class MedicalService {
  relationCondition = RELATION_CONDITION;
  medicalCondition = MEDICAL_CONDITION;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  setMedicalFormGroup(){
    let formControls = {
      medications: [''],
      hasHistory: [false],
      hasHistoryDet: [''],
      hasSurgical: [false],
      hasSurgicalDet: [''],
      hasMedAllergies:[false],
      hasMedAllergiesDet: [''],
      hasOthAllergies: [false],
      hasOthAllergiesDet: [''],
      ageOfMenarche: [''],
      lastMenstruation : [''],
      beenPregnant: [false],
      beenPregnantDet: [''],
      hasBreastLump: [false],
      hasBreastLumpDet: [''],
      remarksCheck: [false, Validators.requiredTrue],
      //...this.medicalFg.controls
    }

    this.relationCondition.forEach((relation)=>{
      formControls[relation.controlKey] = [false];
      formControls[relation.relationKey] = [''];
    });

    this.medicalCondition.forEach((relation)=>{
      formControls[relation.controlKey] = [false];
      formControls[relation.relationKey] = [''];
    });

    return this.fb.group(formControls);
  }
}
