import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap, switchMap } from 'rxjs';
import { PrintService } from 'src/app/shared/services/print.service';

@Component({
  selector: 'app-oral-health',
  templateUrl: './oral-health.component.html',
  styleUrls: ['./oral-health.component.sass']
})
export class OralHealthComponent implements OnInit {

  fields = [
    {code: 'dtExamined',label:'Date of Oral Examination', type:'date'},
    {code: 'dentalCaries',label:'Dental Caries', type:'checkbox'},
    {code: 'gingivitis',label:'Gingivitis', type:'checkbox'},
    {code: 'debris',label:'Debris', type:'checkbox'},
    {code: 'calculus',label:'Calculus', type:'checkbox'},
    {code: 'abnormalGrowth',label:'Abnormal Growth', type:'checkbox'},
    {code: 'cleft',label:'Cleft Lip/Palate', type:'checkbox'},
    {code: 'others',label:'Others(Supernumerary/mesiodents,etc.)', type:'checkbox-text', othersCode:'othersDet'},
    {code: 'noPermTeeth',label:'No. of Perm. Teeth Present', type:'number'},
    {code: 'noPermSound',label:'No. of Perm. Sound Teeth', type:'number'},
    {code: 'noDecayed',label:'No. of Decayed Teeth (D)', type:'number'},
    {code: 'noMissing',label:'No. of Missing Teeth (M)', type:'number'},
    {code: 'noFilling',label:'No. of Filling Teeth (F)', type:'number'},
    {code: 'totalDmf',label:'Total DMF Teeth', type:'number'},
    {code: 'totalTeeth',label:'Total Teeth', type:'number'},

  ];

  oralFg: FormGroup;
  id = null;
  oralHealth$ = this.printService.oralHealth$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly printService: PrintService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    let columns = {};
    this.fields.forEach((field)=>{
      let value: '' | false;
      switch(field.type){
        case 'checkbox':
        case 'checkbox-text':
          value = false;
          break;
        case 'text':
          value = '';
          break;
      }
      columns[field.code] = value;

      if(field.type === 'checkbox-text'){
        columns[field.othersCode] = '';
      }
    })
    this.oralFg = this.fb.group(columns);

    this.route.queryParams.pipe(
      tap((params)=>{
        if(params.hasOwnProperty('id')){
          this.id = params['id'];
        }
      }),
      take(1),
      switchMap(()=>this.oralHealth$),
      tap((data)=>{
        this.oralFg.patchValue(data);
      })
    ).subscribe();
  }

  printPreview(){
    this.printService.changeOralHealth(this.oralFg.value);
    this.router.navigateByUrl(`forms/oral-health-print?id=${this.id}`);
  }
}
