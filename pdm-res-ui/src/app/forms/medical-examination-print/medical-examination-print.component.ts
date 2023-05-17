import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF}  from 'jspdf';
import * as moment from 'moment';
import { map, Observable, switchMap, tap } from 'rxjs';
import { PatientService } from 'src/app/patient/patient-personal.service';
import { PatientModel } from 'src/app/shared/model/patient.model';

@Component({
  selector: 'app-medical-examination-print',
  templateUrl: './medical-examination-print.component.html',
  styleUrls: ['./medical-examination-print.component.sass']
})
export class MedicalExaminationPrintComponent implements OnInit{
  @ViewChild('print') print: HTMLElement;
  curDate = moment().format('YYYY-MM-DD');
  patientId: string;
  patientInfo$: Observable<PatientModel>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly patientService: PatientService
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
  }

  getAge(patientInfo: PatientModel){
   
    return moment().diff(patientInfo.birthDate,'years');
  }
}
