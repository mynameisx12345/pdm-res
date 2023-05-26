import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintService } from 'src/app/shared/services/print.service';
import { switchMap, tap, take } from 'rxjs';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.sass']
})
export class LaboratoryComponent implements OnInit {
  laboratoryFg: FormGroup;
  id: string;

  laboratory$ = this.printService.laboratory$;
  constructor(
    private readonly fb: FormBuilder,
    private readonly printService: PrintService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ){}

  ngOnInit(): void {
    this.laboratoryFg = this.fb.group({
      requestedBy: [''],
      cbc: [false],
      platelet: [false],
      blood: [false],
      urinalysis: [false],
      fecalysis: [false],
      hbsag: [false],
      audiometry: [false],
      ishihara: [false],
      serum: [false],
      sputum: [false],
      fbs: [false],
      cholesterol: [false],
      triglycerides: [false],
      belirubin: [false],
      lipid: [false],
      sgpt: [false],
      sgot: [false],
      creatinine: [false],
      bun: [false],
      uric: [false],
      hba: [false],
      tsh: [false],
      xray:[''],
      utz: [''],
      ecg: [''],
      ct: [''],
      others: ['']
    });

    this.route.queryParams.pipe(
      tap((params)=>{
        if(params.hasOwnProperty('id')){
          this.id = params['id'];
        }
      }),
      take(1),
      switchMap(()=>this.laboratory$),
      tap((data)=>{
        this.laboratoryFg.patchValue(data);
      })
    ).subscribe();
  }

  printPreview(){
    this.printService.changeLaboratory(this.laboratoryFg.value);
    this.router.navigateByUrl(`forms/laboratory-print?id=${this.id}`);
  }
}
