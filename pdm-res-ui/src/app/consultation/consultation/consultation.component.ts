import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DentalService } from 'src/app/shared/components/dental/dental.service';
import { MedicalService } from 'src/app/shared/components/medical/medical.service';
import { DENTAL_CONDITION } from 'src/app/shared/constant/dental.constants';
import { MEDICAL_CONDITION, RELATION_CONDITION } from 'src/app/shared/constant/medical.constant';
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
    private dentalService: DentalService
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

  setCurrentStep (curStep,stepper:MatStepper) {
    this.stepsStatus[curStep] = true
    this.goNext(stepper);
  }

  goNext(stepper: MatStepper){
    setTimeout(()=>{
      stepper.next()
    }, 1)
  }


}
