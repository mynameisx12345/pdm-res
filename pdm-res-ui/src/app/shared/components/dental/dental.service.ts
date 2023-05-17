import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DENTAL_CONDITION } from '../../constant/dental.constants';

@Injectable({
  providedIn: 'root'
})
export class DentalService {

  constructor(
    private readonly fb: FormBuilder
  ) { }

  setDentalFormGroup (){
    let formsControl = {
      onMedicalTreatment: [false],
      hasBadExperience: [false],
      hasBadExperienceDet: [''],
      hasUnusualReaction: [false],
      isBleedProfusely: [false],
      hasUndergoneSurgery: [false],
      hasAllergicReactions: [false],
      hasMedication: [false],
      hasMedicationDet: [''],
      hasShortBreath: [false],
      hasWounds: [false],
      hasSpecialDiet: [false],
      hasPregnancy: [false],
      hasPeriod: [false],
      remarksCheck: [false, Validators.requiredTrue]

    }

    DENTAL_CONDITION.forEach((condition)=>{
      formsControl[condition.controlKey] = false;
    })

    return this.fb.group(formsControl);
  }
}
