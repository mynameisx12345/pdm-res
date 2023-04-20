import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medical-purpose',
  templateUrl: './medical-purpose.component.html',
  styleUrls: ['./medical-purpose.component.sass']
})
export class MedicalPurposeComponent implements OnInit {
  private _medicalPurposeFg: FormGroup;
  @Input() set medicalPurposeFg(data:FormGroup){
    this._medicalPurposeFg = data;
  }

  get medicalPurposeFg(): FormGroup{
    return this._medicalPurposeFg;
  }

  constructor(
    private readonly fb: FormBuilder
  ){}

    ngOnInit(): void {
     
      
    }
}
