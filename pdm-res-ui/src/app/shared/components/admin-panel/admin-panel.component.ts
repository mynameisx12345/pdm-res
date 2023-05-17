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
    this.router.navigateByUrl(`forms/medical-examination?id=${this.requestData.patientId}`);
  }
}
