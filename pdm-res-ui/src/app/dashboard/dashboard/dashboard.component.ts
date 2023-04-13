import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  welcomeMessage = 'Welcome to Your School Health Clinic! \nWe are glad to help you on your health needs! Checkout our services below:';
  services = [
    {
      label:'Medical and Detal Consultation', link:''
    },
    {
      label:'Tooth Extraction', link:''
    },
    {
      label:'First-Aid Treatment', link:''
    },
    {
      label:'Health Counselling', link:''
    },
  ];

  @ViewChild('registrationInfo') registrationInfo: TemplateRef<any>;
  currentDialog: MatDialogRef<any>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router
  ){}

  ngOnInit(): void {
  }

  onServiceSelect(link){
    this.currentDialog = this.dialog.open(this.registrationInfo, {
      disableClose: false,
      width: '30%',
    })
  }

  onRegister(){
    this.currentDialog.close();
    this.router.navigate(['register']);
  }
}
