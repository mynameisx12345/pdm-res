import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dental-purpose',
  templateUrl: './dental-purpose.component.html',
  styleUrls: ['./dental-purpose.component.sass']
})
export class DentalPurposeComponent implements OnInit {
  private _dentalPurposeFg: FormGroup;
  @Input() set dentalPurposeFg(data:FormGroup){
    this._dentalPurposeFg = data;
  }

  get dentalPurposeFg():FormGroup{
    return this._dentalPurposeFg;
  }
  constructor(
    private readonly fb: FormBuilder
  ){}

  ngOnInit(): void {
    
  }

}
