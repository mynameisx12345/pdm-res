import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private medicalExamination = new BehaviorSubject(null);
  medicalExamination$ = this.medicalExamination.asObservable();

  private medicalClearance = new BehaviorSubject(null);
  medicalClearance$ = this.medicalClearance.asObservable();

  private oralHealth = new BehaviorSubject(null);
  oralHealth$ = this.oralHealth.asObservable();

  private referral = new BehaviorSubject(null);
  referral$ = this.referral.asObservable();

  private laboratory = new BehaviorSubject(null);
  laboratory$ = this.laboratory.asObservable();

  changeMedicalExamination(data){
    this.medicalExamination.next(data);
  }

  changeMedicalClearance(data){
    this.medicalClearance.next(data);
  }

  changeOralHealth(data){
    this.oralHealth.next(data);
  }

  changeReferral(data){
    this.referral.next(data);
  }

  changeLaboratory(data){
    this.laboratory.next(data);
  }
}