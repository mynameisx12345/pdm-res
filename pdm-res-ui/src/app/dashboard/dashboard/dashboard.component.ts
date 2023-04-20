import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPatient } from 'src/app/maintenance/state/patient.state/patient.state.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  welcomeMessage = 'Welcome to Your School Health Clinic! \nWe are glad to help you on your health needs! Checkout our services below:';
  services = [
    {
      label:'Medical and Dental Consultation', link:'/consultation'
    },
    {
      label:'Tooth Extraction', link:'/tooth-extraction'
    },
    {
      label:'First-Aid Treatment', link:'/first-aid'
    },
    {
      label:'Health Counselling', link:''
    },
  ];

  @ViewChild('registrationInfo') registrationInfo: TemplateRef<any>;
  currentDialog: MatDialogRef<any>;
  currentPatient$ = this.store.select(getPatient);
  loggedIn = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly store: Store
  ){}

  ngOnInit(): void {
    this.currentPatient$.subscribe((patient)=>{
      this.loggedIn = patient !== null;
    })
  }

  onServiceSelect(link){
    if(!this.loggedIn){
      this.currentDialog = this.dialog.open(this.registrationInfo, {
        disableClose: false,
        width: '30%',
      })
   
    } else {
      this.router.navigate([link]);
    }
  }

  onRegister(){
    this.currentDialog.close();
    this.router.navigate(['register']);
  }
}
