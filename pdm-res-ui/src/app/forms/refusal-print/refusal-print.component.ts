import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { PatientService } from 'src/app/patient/patient-personal.service';
import { PatientModel } from 'src/app/shared/model/patient.model';

@Component({
  selector: 'app-refusal-print',
  templateUrl: './refusal-print.component.html',
  styleUrls: ['./refusal-print.component.sass']
})
export class RefusalPrintComponent implements OnInit {
  patientInfo$: Observable<PatientModel>;
  patientId: string;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly patientService: PatientService,
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
