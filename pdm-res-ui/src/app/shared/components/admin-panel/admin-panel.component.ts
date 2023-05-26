import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MyRequestsModel } from '../../model/patient.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.sass']
})
export class AdminPanelComponent {
  @Output() startProcessing = new EventEmitter;
  @Output() complete = new EventEmitter;
  @Input() requestData: MyRequestsModel;

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
    let url = `http://localhost:4200/forms/medical-examination?id=${this.requestData.patientId}`
  
    window.open(url, '_blank');
    //this.router.navigateByUrl(`forms/medical-examination?id=${this.requestData.patientId}`);
  }

  openMedClearance(){
    let url = `http://localhost:4200/forms/medical-clearance?id=${this.requestData.patientId}`
  
    window.open(url, '_blank');
    //this.router.navigateByUrl(`forms/medical-examination?id=${this.requestData.patientId}`);
  }

  openOralHealth(){
    let url = `http://localhost:4200/forms/oral-health?id=${this.requestData.patientId}`;
    window.open(url, '_blank');
  }

  openReferral(){
    let url = `http://localhost:4200/forms/referral?id=${this.requestData.patientId}`;
    window.open(url, '_blank');
  }

  openRefusal(){
    let url = `http://localhost:4200/forms/refusal?id=${this.requestData.patientId}`;
    window.open(url, '_blank');
  }
  openLaboratory(){
    let url = `http://localhost:4200/forms/laboratory?id=${this.requestData.patientId}`;
    window.open(url, '_blank');
  }
}
