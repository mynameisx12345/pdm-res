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
  selector: 'app-referral-form-print',
  templateUrl: './referral-form-print.component.html',
  styleUrls: ['./referral-form-print.component.sass']
})
export class ReferralFormPrintComponent implements OnInit{

  patientInfo$: Observable<PatientModel>;
  patientId: string;
  referral$ = this.printService.referral$;
  content$: Observable<{patientInfo: PatientModel,referral:any }>;
  curDate = moment().format('YYYY-MM-DD');

  constructor(
    private readonly printService: PrintService,
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

    this.content$ = combineLatest([this.patientInfo$, this.referral$]).pipe(
      map(([patientInfo, referral])=>{
        if(!referral){
          referral = {};
        }
        return {
          patientInfo,
          referral
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
