import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take, tap, switchMap } from 'rxjs';
import { PatientService } from 'src/app/patient/patient-personal.service';
import { Action } from 'src/app/shared/model/patient.model';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.sass']
})
export class PrescriptionComponent implements OnInit{
  prescriptionFg: FormGroup;
  requestId = null;
  curId = null;
  patientId = null;
  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly patientService: PatientService
  ){}

  ngOnInit(): void {
    this.prescriptionFg = this.fb.group({
      prescription: ['', Validators.required]
    });

    this.route.queryParams.pipe(
      tap((params)=>{
       
        if(params.hasOwnProperty('requestId')){
          this.requestId = params['requestId'];
        }

        if(params.hasOwnProperty('id')){
          this.patientId = params['id'];
        }
      }),
      switchMap((params)=>this.patientService.getAction(this.requestId)),
      tap((action:Action)=>{
        if(action){
          this.curId = action.id;
          this.prescriptionFg.patchValue(JSON.parse(action.data))
        }
        
      }),
    ).subscribe();
  }

  save(){
    let action:Action = {
      id:this.curId,
      actionType: 'Prescription',
      data: JSON.stringify(this.prescriptionFg.value),
      requestId: this.requestId,
      patientId: this.patientId
    }
    this.patientService.addAction(action).pipe(
      tap(()=>{
        window.close();
      }),
      take(1)
    ).subscribe();
  }


}
