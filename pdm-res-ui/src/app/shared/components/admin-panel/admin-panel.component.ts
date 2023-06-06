import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MyRequestsModel } from '../../model/patient.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.sass']
})
export class AdminPanelComponent {
  @Output() startProcessing = new EventEmitter;
  @Output() complete = new EventEmitter;
  @Input() requestData: MyRequestsModel;
  uiUrl = environment.uiUrl;

  constructor(
    private readonly router: Router
  ){}
  startProcess(){
    this.startProcessing.emit();
  }

  completeRequest(){
    this.complete.emit();
  }

  openMedExam(){
    let url = `${this.uiUrl}/forms/medical-examination?id=${this.requestData.patientId}`
  
    window.open(url, '_blank');
    //this.router.navigateByUrl(`forms/medical-examination?id=${this.requestData.patientId}`);
  }

  openMedClearance(){
    let url = `${this.uiUrl}/forms/medical-clearance?id=${this.requestData.patientId}`
  
    window.open(url, '_blank');
    //this.router.navigateByUrl(`forms/medical-examination?id=${this.requestData.patientId}`);
  }

  openOralHealth(){
    let url = `${this.uiUrl}/forms/oral-health?id=${this.requestData.patientId}`;
    window.open(url, '_blank');
  }

  openReferral(){
    let url = `${this.uiUrl}/forms/referral?id=${this.requestData.patientId}`;
    window.open(url, '_blank');
  }

  openRefusal(){
    let url = `${this.uiUrl}/forms/refusal?id=${this.requestData.patientId}`;
    window.open(url, '_blank');
  }
  openLaboratory(){
    let url = `${this.uiUrl}/forms/laboratory?id=${this.requestData.patientId}`;
    window.open(url, '_blank');
  }

  openPrescription(){
    let url = `${this.uiUrl}/forms/prescription?id=${this.requestData.patientId}&requestId=${this.requestData.id}`;
    window.open(url, '_blank');
  }
}
