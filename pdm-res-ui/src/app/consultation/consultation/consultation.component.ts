import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { addMyRequest } from 'src/app/maintenance/state/patient.state/patient.state.action';
import { getPatient } from 'src/app/maintenance/state/patient.state/patient.state.selector';
import { DentalService } from 'src/app/shared/components/dental/dental.service';
import { MedicalService } from 'src/app/shared/components/medical/medical.service';
import { DENTAL_CONDITION } from 'src/app/shared/constant/dental.constants';
import { MEDICAL_CONDITION, RELATION_CONDITION } from 'src/app/shared/constant/medical.constant';
import { MyRequestsModel } from 'src/app/shared/model/patient.model';
import { SharedUtility } from 'src/app/shared/util';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.sass']
})
export class ConsultationComponent implements OnInit {
  consultationOption: FormGroup;
  medicalFg: FormGroup = this.medicalService.setMedicalFormGroup();
  dentalFg: FormGroup = this.dentalService.setDentalFormGroup();
  medicalPurposeFg: FormGroup;
  dentalPurposeFg: FormGroup;

  stepsStatus = {
    one: false,
    two: false,
    three: false
  }
  currentStep = 1;
  
  constructor(
    private readonly fb: FormBuilder,
    public sharedUtility: SharedUtility,
    private medicalService: MedicalService,
    private dentalService: DentalService,
    private router: Router,
    private readonly store: Store
  ){
  }

  ngOnInit(): void {
    this.consultationOption = this.fb.group({
      medical: [false],
      dental: [false]
    });

    this.medicalPurposeFg = this.fb.group({
      medicalExam: [false],
      medicalClearance: [false],
      others: [false],
      othersDet: ['']
    });

    this.dentalPurposeFg = this.fb.group({
      othersDet: ['']
    });

    
  }


  hasSelectedOption (){
    let hasValue = false;
    Object.keys(this.consultationOption.controls).forEach((control)=>{
      hasValue = hasValue || !!this.consultationOption.get(control).value
    });
    return hasValue
  }

  complete(){
    this.store.select(getPatient).pipe(
      tap((patient)=>{
        let consultationDetails ={
          consultationOption: this.consultationOption.value,
          medicalDetails: this.medicalFg.value,
          dentalDetails: this.dentalFg.value,
          medicalPurpose: this.medicalPurposeFg.value,
          dentalPurpose: this.dentalPurposeFg.value
        }
        let myRequest: MyRequestsModel = {
          id: null,
          patientId: patient.id,
          requestType: 'Consultation',
          requestJson: consultationDetails
        }
        this.store.dispatch(addMyRequest(myRequest));
      })
    ).subscribe();
    this.router.navigate(['/home'])
  }

  // setCurrentStep (curStep,stepper:MatStepper) {
  //   this.stepsStatus[curStep] = true
  //   this.goNext(stepper);
  // }

  // goNext(stepper: MatStepper){
  //   setTimeout(()=>{
  //     stepper.next()
  //   }, 1)
  // }


}
