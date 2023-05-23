import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { map, Observable, switchMap, tap } from 'rxjs';
import { PatientService } from 'src/app/patient/patient-personal.service';
import { PatientModel } from 'src/app/shared/model/patient.model';
import { PrintService } from 'src/app/shared/services/print.service';

@Component({
  selector: 'app-medical-clearance-print',
  templateUrl: './medical-clearance-print.component.html',
  styleUrls: ['./medical-clearance-print.component.sass']
})
export class MedicalClearancePrintComponent implements OnInit {
  curDate = moment().format('YYYY-MM-DD');
  patientInfo$: Observable<PatientModel>;
  patientId: string;
  medicalClearanceInfo$ = this.printService.medicalClearance$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly patientService: PatientService,
    private readonly printService: PrintService
  ){}

  ngOnInit(): void {
    this.patientInfo$ =  this.route.queryParams.pipe(
      map((params)=>{
        if(params.hasOwnProperty('id')){
          this.patientId = params['id'];
        }

        return this.patientId;
      }),
      switchMap((id)=> this.patientService.getPatientInfo(id))
    )
  }

  getAge(patientInfo: PatientModel){
    return moment().diff(patientInfo.birthDate,'years');
  }
}
