import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/patient/patient-personal.service';
import { map, switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { act } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-patient-history-details',
  templateUrl: './patient-history-details.component.html',
  styleUrls: ['./patient-history-details.component.sass']
})
export class PatientHistoryDetailsComponent implements OnInit{
  patientId = null;
  personalFg: FormGroup;
  requests = null;
  patientInfo$ =  this.route.queryParams.pipe(
    map((params)=>{
      if(params.hasOwnProperty('patientId')){
        this.patientId = params['patientId'];
      }

      return this.patientId;
    }),
    switchMap((id)=> this.patientService.getPatientInfo(id)),
    map(info=>{
      console.log('info12', info)
     info.birthDate = info.birthDate.substr(0,10);
      this.personalFg.patchValue(info)
      return info.id
    }),
    switchMap((id)=> this.patientService.getRequest({patientId: id})),
    map((requests)=>{
      this.requests = requests.request;
      console.log('requests', this.requests);
    })
  )

  uiUrl = environment.uiUrl;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly patientService: PatientService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ){}

  ngOnInit(): void {
    this.personalFg = this.fb.group({
      email:'',
      studentId: [''],
      firstname: [''],
      middlename: [''],
      lastname: [''],
      ext: [''],
      college: '',
      course: '',
      birthDate: '',
      gender: '',
      civilStatus: '',
      bloodType: '',
      birthPlace: '',
      religion: '',
      nationality: '',
      address: '',
      contactNumber: '',
      contactPerson: '',
      contactPerNumber: ''
    })
    this.patientInfo$.subscribe((info)=>{
      console.log('info', info)
    })
  }

  getPrescription(action){
    return JSON.parse(action)?.prescription;
  }

  viewRequest(element){
    
    let route = '/';
    switch(element.requestType){
      case 'Consultation':
        route = `/consultation?id=${element.id}`;
        break;
      case 'Tooth Extraction':
        route = `/tooth-extraction?id=${element.id}`
        break;
      case 'First-Aid Treatment':
        route = `/first-aid?id=${element.id}`;
        break;
      case 'Health Counselling':
        route = `/health-counselling?id=${element.id}`;
        break;
      case 'Medical Consultation':
        route = `/medical?id=${element.id}`;
        break;
      case 'Dental Consultation':
        route = `/dental?id=${element.id}`;
        break;
    }

    let url = `${this.uiUrl}${route}`;
    window.open(url, '_blank');
  }

}
