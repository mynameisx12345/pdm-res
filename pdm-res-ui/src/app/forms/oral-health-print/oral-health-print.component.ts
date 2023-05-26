import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { PatientService } from 'src/app/patient/patient-personal.service';
import { PatientModel } from 'src/app/shared/model/patient.model';
import { PrintService } from 'src/app/shared/services/print.service';

@Component({
  selector: 'app-oral-health-print',
  templateUrl: './oral-health-print.component.html',
  styleUrls: ['./oral-health-print.component.sass']
})
export class OralHealthPrintComponent implements OnInit{
  patientInfo$: Observable<PatientModel>;
  patientId: string;
  oralHealth$ = this.printService.oralHealth$;
  content$: Observable<{patientInfo: PatientModel,oralHealth:any }>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly patientService: PatientService,
    private readonly printService: PrintService,
    private readonly location: Location
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

    this.content$ = combineLatest([this.patientInfo$, this.oralHealth$]).pipe(
      map(([patientInfo, oralHealth])=>{
        if(!oralHealth){
          oralHealth = {};
        }

        if(oralHealth?.dtExamined){
          oralHealth.dtExamined = moment(oralHealth.dtExamined).format('YYYY-MM-DD');
        }
    
        return {
          patientInfo,
          oralHealth
        }
      })
    )
  }

  startPrint(printHtml){
    const doc = new jsPDF();

    doc.html(printHtml,{
      callback: function(doc) {
        // Save the PDF
        doc.save('pdm-res.pdf');
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
