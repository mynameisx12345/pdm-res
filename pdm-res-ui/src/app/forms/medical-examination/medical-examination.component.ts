import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PrintService } from 'src/app/shared/services/print.service';


@Component({
  selector: 'app-medical-examination',
  templateUrl: './medical-examination.component.html',
  styleUrls: ['./medical-examination.component.sass']
})
export class MedicalExaminationComponent implements OnInit{
  id: string;
  examFg: FormGroup;

  medicalExamInfo$ = this.printService.medicalExamination$;
  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly printService: PrintService
  ){}

  ngOnInit(): void {
   this.examFg = this.fb.group({
      height: [''],
      weight: [''],
      temperature: [''],
      pulseRate: [''],
      bloodPressure: [''],
      isEnrollment: [false],
      isTraining: [false],
      isIntramurals: [false],
      isOthers: [false],
      othersDet: [''],
      headAndNeck: [''],
      respiratory: [''],
      cardio: [''],
      digestive: [''],
      genito:[''],
      nervous: [''],
      reproductive: [''],
      locomotor: [''],
      pastMedical: [''],
      remarks: [''],
      physician: [''],
      licenseNo: ['']
   })

    this.route.queryParams.pipe(
      tap((params)=>{
        if(params.hasOwnProperty('id')){
          this.id = params['id'];
        }
      }),
      switchMap(()=>this.medicalExamInfo$),
      tap((data)=>{
        this.examFg.patchValue(data);
      })
    ).subscribe();

    
  }
  cancel(){
    this.location.back();
  }

  printPreview(){
    this.printService.changeMedicalExamination(this.examFg.value)
    this.router.navigateByUrl(`forms/medical-examination-print?id=${this.id}`);
  }


}
