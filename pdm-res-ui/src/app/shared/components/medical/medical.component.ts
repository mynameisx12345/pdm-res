import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable, startWith, take, combineLatest } from 'rxjs';
import { MEDICAL_CONDITION, RELATION_CONDITION } from 'src/app/shared/constant/medical.constant';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.sass']
})
export class MedicalComponent implements OnInit, AfterViewInit{
  _medicalFg: FormGroup
  @Input() set medicalFg (data:FormGroup) {
    this._medicalFg = data;
  }

  get medicalFg(){
    return this._medicalFg;
  }
  relationCondition = RELATION_CONDITION;
  medicalCondition = MEDICAL_CONDITION;
  constructor(
    private readonly fb: FormBuilder,
    private readonly changeRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    // let formControls = {
    //   medications: [''],
    //   hasHistory: [false],
    //   hasHistoryDet: [''],
    //   hasSurgical: [false],
    //   hasSurgicalDet: [''],
    //   hasMedAllergies:[false],
    //   hasMedAllergiesDet: [''],
    //   hasOthAllergies: [false],
    //   hasOthAllergiesDet: [''],
    //   ageOfMenarche: [''],
    //   lastMenstruation : [''],
    //   beenPregnant: [false],
    //   beenPregnantDet: [''],
    //   hasBreastLump: [false],
    //   hasBreastLumpDet: [''],
    //   //remarksCheck: [false, Validators.requiredTrue],
    //   ...this.medicalFg.controls
    // }

    // this.relationCondition.forEach((relation)=>{
    //   formControls[relation.controlKey] = [false];
    //   formControls[relation.relationKey] = [''];
    // });

    // this.medicalCondition.forEach((relation)=>{
    //   formControls[relation.controlKey] = [false];
    //   formControls[relation.relationKey] = [''];
    // });

   // this.medicalFg = this.fb.group(formControls);
    //this.medicalFg.get('hasHistoryDet').setAsyncValidators(this.requiredIfTrue(this.medicalFg));
  }

  ngAfterViewInit(): void {
    //this.medicalFg.get('hasHistoryDet').addAsyncValidators(this.requiredIfTrue('hasHistory'));
  }

  requiredIfTrue(formGroup: FormGroup): AsyncValidatorFn{
    return (control:AbstractControl): Observable<ValidationErrors | null>=> {
      // const needRequire = formGroup.get('hasHistory').value
      // const noValue = needRequire ? !(control.value) : false;
      // console.log('123', noValue ? {required: control.value} : null)
      // return noValue ? {required: control.value} : null;
      return combineLatest([formGroup.get('hasHistory').valueChanges,
      formGroup.get('hasHistoryDet').valueChanges]).pipe(
        map(([checkBox, details])=>{
          const noValue = checkBox ? !(details) : false;
          console.log('123', noValue ? {required: control.value} : null)
          return noValue ? {required: details} : null;
          
        }),
        startWith(null),
        //take(1)
      )
      
      // formGroup.get('hasHistory').valueChanges.pipe(
      //   map((needRequire)=>{
      //     const noValue = needRequire ? !(control.value) : false;
      //     console.log('123', noValue ? {required: control.value} : null)
      //     return noValue ? {required: control.value} : null;
           
      //   }),
      //   take(1),
      //   startWith(null)
      // )
    
    }
  }

}
