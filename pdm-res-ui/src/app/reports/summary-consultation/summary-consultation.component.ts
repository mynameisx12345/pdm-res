import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { PatientService } from 'src/app/patient/patient-personal.service';

@Component({
  selector: 'app-summary-consultation',
  templateUrl: './summary-consultation.component.html',
  styleUrls: ['./summary-consultation.component.sass']
})
export class SummaryConsultationComponent implements OnInit {
  requestType = 'Consultation';
  constructor(
    private readonly patientService: PatientService,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.dataSource$ = this.route.queryParams.pipe(
      map((param)=>{
        if(param.hasOwnProperty('type')){
          switch(param['type']){
            case 'C':
              this.requestType ='Consultation'
              break;
            case 'T':
              this.requestType = 'Tooth Extraction'
              break;
            case 'F':
              this.requestType = 'First-Aid Treatment'
              break;
            case 'H':
              this .requestType ='Health Counselling';
              break;
          }
        }
        return this.requestType;
      }),
      switchMap((requestType)=>{
        return this.patientService.getRequest({requestType:requestType}).pipe(
          map((data)=>{
            return data.request;
          })
        )
      })
    )
  }

  dataSource$: Observable<any>;
  // dataSource$ = this.patientService.getRequest({requestType:this.requestType}).pipe(
  //   map((data)=>{
  //     return data.request;
  //   })
  // )
  columns = {
    'id':'ID',
    'requestType':'Request Type',
    'patientName': 'Patient Name',
    'status':'Status',
    dtInitiated: 'Date Initiated',
    dtProcessed: 'Date Processed',
    dtCompleted: 'Date Completed'
  }


}
