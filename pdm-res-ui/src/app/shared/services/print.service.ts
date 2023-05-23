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

  changeMedicalExamination(data){
    this.medicalExamination.next(data);
  }

  changeMedicalClearance(data){
    this.medicalClearance.next(data);
  }
}