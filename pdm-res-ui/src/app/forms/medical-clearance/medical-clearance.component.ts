import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, take } from 'rxjs';
import { PrintService } from 'src/app/shared/services/print.service';

@Component({
  selector: 'app-medical-clearance',
  templateUrl: './medical-clearance.component.html',
  styleUrls: ['./medical-clearance.component.sass']
})
export class MedicalClearanceComponent implements OnInit{
  clearanceFg: FormGroup;
  id: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly printService: PrintService
  ){}

  ngOnInit(): void {
    this.clearanceFg = this.fb.group({
      dtExam: [''],
      isEnrollment:[false],
      isTraining: [false],
      isEmployment: [false],
      isOthers: [false],
      othersDet: [''],
      physician: [''],
      licenseNo: ['']
    })

    this.route.queryParams.pipe(
      tap((params)=>{
        if(params.hasOwnProperty('id')){
          this.id = params['id'];
        }
      }),
      take(1)
      // switchMap(()=>this.medicalExamInfo$),
      // tap((data)=>{
      //   this.examFg.patchValue(data);
      // })
    ).subscribe();
  }

  printPreview(){
    this.printService.changeMedicalExamination(this.clearanceFg.value);
    this.router.navigateByUrl(`forms/medical-clearance-print?id=${this.id}`);
  }

}
