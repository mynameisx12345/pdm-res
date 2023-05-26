import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take, tap } from 'rxjs';
import { PrintService } from 'src/app/shared/services/print.service';

@Component({
  selector: 'app-referral-form',
  templateUrl: './referral-form.component.html',
  styleUrls: ['./referral-form.component.sass']
})
export class ReferralFormComponent implements OnInit {
  referralFg: FormGroup;
  id = null;

  referral$ = this.printService.referral$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly printService: PrintService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.referralFg = this.fb.group({
      complaints: [''],
      rhu:[false],
      rhuDet: [''],
      hospital: [false],
      hospitalDet: [''],
      private: [false],
      privateDet: [''],
      others: [''],
      hospitalization: [false],
      hospitalizationDet: [''],
      physical: [false],
      physicalDet: [''],
      xray: [false],
      xrayDet: [''],
      othersS:[''],
      referredBy: ['']
    });

    this.route.queryParams.pipe(
      tap((params)=>{
        if(params.hasOwnProperty('id')){
          this.id = params['id'];
        }
      }),
      take(1),
      switchMap(()=>this.referral$),
      tap((data)=>{
        this.referralFg.patchValue(data);
      })
    ).subscribe();
  }

  printPreview(){
    this.printService.changeReferral(this.referralFg.value);
    this.router.navigateByUrl(`forms/referral-print?id=${this.id}`);
  }
}
