import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { PatientService } from 'src/app/patient/patient-personal.service';
import { PatientModel } from 'src/app/shared/model/patient.model';
import { PrintService } from 'src/app/shared/services/print.service';
import { jsPDF}  from 'jspdf';
import { Location } from '@angular/common';

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

  content$: Observable<{patientInfo: PatientModel,medicalClearance:any }>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly patientService: PatientService,
    private readonly printService: PrintService,
    private readonly location: Location,
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

    this.content$ = combineLatest([this.patientInfo$, this.medicalClearanceInfo$]).pipe(
      map(([patientInfo, medicalClearance])=>{
        if(!medicalClearance){
          medicalClearance = {};
        }
        if(medicalClearance?.dtExam){
          medicalClearance.dtExam = moment(medicalClearance.dtExam).format('YYYY-MM-DD');
        } else {
          medicalClearance.dtExam = '__________________';
        }
        return {
          patientInfo,
          medicalClearance
        }
      })
    )
  }

 

  getAge(patientInfo: PatientModel){
    return moment().diff(patientInfo.birthDate,'years');
  }

  startPrint(printHtml){
    const doc = new jsPDF();

    doc.html(printHtml,{
      callback: function(doc) {
        // Save the PDF
        doc.save('medical-examination.pdf');
      },
      //margin: [10, 10, 10, 10],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 190, //target width in the PDF document
      windowWidth: 900, //window width in CSS pixels
    })
    setTimeout(() => {
      window.close();
    }, 1000);
  }

  cancel(){
    this.location.back();
  }
}
