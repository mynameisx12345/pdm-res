import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicalService } from '../shared/components/medical/medical.service';
import { MyRequestsModel, PatientModel } from '../shared/model/patient.model';
import { Store } from '@ngrx/store';
import { changeStatus, startAddMyRequest } from '../maintenance/state/patient.state/patient.state.action';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Subscription, take, tap, withLatestFrom } from 'rxjs';
import { getPatient, getPatientRequests } from '../maintenance/state/patient.state/patient.state.selector';

@Component({
  selector: 'app-first-aid',
  templateUrl: './first-aid.component.html',
  styleUrls: ['./first-aid.component.sass']
})
export class FirstAidComponent implements OnInit, AfterViewInit {
  medicalFg: FormGroup = this.medicalService.setMedicalFormGroup();
  medicalPurposeFg: FormGroup;
  currentRequest: MyRequestsModel;
  reqId = null;
  patientInfo: PatientModel;
  myRequests$ = this.store.select(getPatientRequests);

  constructor(
    private readonly medicalService: MedicalService,
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.medicalPurposeFg = this.fb.group({
      medicalExam: [false],
      medicalClearance: [false],
      others: [false],
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
          this.medicalFg.patchValue(requestJson.medicalDetails);
          this.medicalPurposeFg.patchValue(requestJson.medicalPurpose);
        }
      })
    ).subscribe();
    
  }

  complete(){
    if(this.currentRequest?.status === 'Processing' || this.currentRequest?.status === 'Completed'){
      return;
    }
    let consultationDetails ={
      medicalDetails: this.medicalFg.value,
      medicalPurpose: this.medicalPurposeFg.value,
    }
    let myRequest: MyRequestsModel = {
      id: this.reqId,
      patientId: this.patientInfo.id,
      requestType: 'Medical Consultation',
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
