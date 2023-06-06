import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DentalService } from '../shared/components/dental/dental.service';
import { MyRequestsModel, PatientModel } from '../shared/model/patient.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { getPatient, getPatientRequests } from '../maintenance/state/patient.state/patient.state.selector';
import { combineLatest, map, Subscription, take, tap, withLatestFrom } from 'rxjs';
import { changeStatus, startAddMyRequest } from '../maintenance/state/patient.state/patient.state.action';

@Component({
  selector: 'app-tooth-extraction',
  templateUrl: './tooth-extraction.component.html',
  styleUrls: ['./tooth-extraction.component.sass']
})
export class ToothExtractionComponent implements OnInit, AfterViewInit {
  dentalFg: FormGroup = this.dentalService.setDentalFormGroup();
  stepsStatus = {
    one: false,
    two: false,
    three: false
  }
  dentalPurposeFg: FormGroup;
  currentRequest: MyRequestsModel;
  patientInfo: PatientModel;
  reqId = null;
  myRequests$ = this.store.select(getPatientRequests);

  constructor(
    private readonly dentalService: DentalService,
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
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
          this.dentalFg.patchValue(requestJson.dentalDetails);
          this.dentalPurposeFg.patchValue(requestJson.dentalPurpose);
        }
      })
    ).subscribe();
    
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

  complete(){
    if(this.currentRequest?.status === 'Processing' || this.currentRequest?.status === 'Completed'){
      return;
    }
    let consultationDetails ={
      dentalDetails: this.dentalFg.value,
      dentalPurpose: this.dentalPurposeFg.value
    }
    let myRequest: MyRequestsModel = {
      id: this.reqId,
      patientId: this.patientInfo.id,
      requestType: 'Dental Consultation',
      requestJson: JSON.stringify(consultationDetails),
      status: 'Initiated',
      patientName: `${this.patientInfo.lastname}, ${this.patientInfo.firstname}`
    }
   
    this.store.dispatch(startAddMyRequest(myRequest));
   
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

}
