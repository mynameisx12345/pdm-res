import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private medicalExamination = new BehaviorSubject(null);
  medicalExamination$ = this.medicalExamination.asObservable();

  
}