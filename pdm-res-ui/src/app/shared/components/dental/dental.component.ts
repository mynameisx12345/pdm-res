import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DENTAL_CONDITION } from 'src/app/shared/constant/dental.constants';

@Component({
  selector: 'app-dental',
  templateUrl: './dental.component.html',
  styleUrls: ['./dental.component.sass']
})
export class DentalComponent implements OnInit {
  private _dentalFg: FormGroup;
  @Input() set dentalFg(data:FormGroup){
    this._dentalFg = data;
  }

  get dentalFg(){
    return this._dentalFg;
  }
  dentalConditions = DENTAL_CONDITION;

  constructor(
    private readonly fb: FormBuilder
  ){}

  ngOnInit(): void {
    
  }

}
