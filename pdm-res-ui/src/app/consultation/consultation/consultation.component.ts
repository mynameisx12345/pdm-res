import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Subscription, take, tap, withLatestFrom } from 'rxjs';
import { addMyRequest, changeStatus, startAddMyRequest } from 'src/app/maintenance/state/patient.state/patient.state.action';
import { getPatient, getPatientRequests } from 'src/app/maintenance/state/patient.state/patient.state.selector';
import { DentalService } from 'src/app/shared/components/dental/dental.service';
import { MedicalService } from 'src/app/shared/components/medical/medical.service';
import { DENTAL_CONDITION } from 'src/app/shared/constant/dental.constants';
import { MEDICAL_CONDITION, RELATION_CONDITION } from 'src/app/shared/constant/medical.constant';
import { MyRequestsModel, PatientModel } from 'src/app/shared/model/patient.model';
import { SharedUtility } from 'src/app/shared/util';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.sass']
})
export class ConsultationComponent implements OnInit, AfterViewInit, OnDestroy {
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
  reqId = null;
  myRequests$ = this.store.select(getPatientRequests);
  completeSubscription: Subscription = new Subscription;
  patientInfo: PatientModel;
  currentRequest: MyRequestsModel;
  constructor(
    private readonly fb: FormBuilder,
    public sharedUtility: SharedUtility,
    private medicalService: MedicalService,
    private dentalService: DentalService,
    private router: Router,
    private readonly store: Store,
    private route: ActivatedRoute
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

    this.store.select(getPatient).pipe(
      tap((patient)=>{
        this.patientInfo = patient;
      })
    ).subscribe();
    
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params)=>{
      if(params.hasOwnProperty('id')){
        this.reqId = params['id'];
      }
    });

    combineLatest([this.route.queryParams, this.myRequests$]).pipe(
      map(([params, myRequests])=>{
        //console.log('myreqeust', myRequests);
        [this.currentRequest] = myRequests.filter((req)=> Number(req.id) === Number(params['id'])) || null;
        //console.log('currentreq', currentRequest);
        if(!!this.currentRequest){
          let requestJson = JSON.parse(this.currentRequest.requestJson);
          this.consultationOption.patchValue(requestJson.consultationOption);
          this.medicalFg.patchValue(requestJson.medicalDetails);
          this.dentalFg.patchValue(requestJson.dentalDetails);
          this.medicalPurposeFg.patchValue(requestJson.medicalPurpose);
          this.dentalPurposeFg.patchValue(requestJson.dentalPurpose);
        }
      })
    ).subscribe();
    
  }


  hasSelectedOption (){
    let hasValue = false;
    Object.keys(this.consultationOption.controls).forEach((control)=>{
      hasValue = hasValue || !!this.consultationOption.get(control).value
    });
    return hasValue
  }

  complete(){
    if(this.currentRequest?.status === 'Processing' || this.currentRequest?.status === 'Completed'){
      return;
    }
    let consultationDetails ={
      consultationOption: this.consultationOption.value,
      medicalDetails: this.medicalFg.value,
      dentalDetails: this.dentalFg.value,
      medicalPurpose: this.medicalPurposeFg.value,
      dentalPurpose: this.dentalPurposeFg.value
    }
    let myRequest: MyRequestsModel = {
      id: this.reqId,
      patientId: this.patientInfo.id,
      requestType: 'Consultation',
      requestJson: JSON.stringify(consultationDetails),
      status: 'Initiated',
      patientName: `${this.patientInfo.lastname}, ${this.patientInfo.firstname}`
    }
   
    this.store.dispatch(startAddMyRequest(myRequest));
   
  }

  ngOnDestroy(): void {
    this.completeSubscription.unsubscribe();
  }

  startProcessing(){
    let myRequest: MyRequestsModel = {
      id: this.currentRequest.id,
      patientId: this.currentRequest.patientId,
      requestType: this.currentRequest.requestType,
      requestJson:this.currentRequest.requestJson,
      status: 'Processing',
      patientName: this.currentRequest.patientName
    }
    this.store.dispatch(changeStatus(myRequest));
  }

  completeRequest(){
    let myRequest: MyRequestsModel = {
      id: this.currentRequest.id,
      patientId: this.currentRequest.patientId,
      requestType: this.currentRequest.requestType,
      requestJson:this.currentRequest.requestJson,
      status: 'Completed',
      patientName: this.currentRequest.patientName
    }
    this.store.dispatch(changeStatus(myRequest));
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
