import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';


@Component({
  selector: 'app-medical-examination',
  templateUrl: './medical-examination.component.html',
  styleUrls: ['./medical-examination.component.sass']
})
export class MedicalExaminationComponent implements OnInit{
  id: string;
  examFg: FormGroup;
  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ){}

  ngOnInit(): void {
   // this.examFg = this.fb.group({})

    this.route.queryParams.pipe(
      tap((params)=>{
        if(params.hasOwnProperty('id')){
          this.id = params['id'];
        }
      })
    ).subscribe();
  }
  cancel(){
    this.location.back();
  }

  printPreview(){
    this.router.navigateByUrl(`forms/medical-examination-print?id=${this.id}`);
  }


}
