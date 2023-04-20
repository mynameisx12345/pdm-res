import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DentalService } from '../shared/components/dental/dental.service';

@Component({
  selector: 'app-tooth-extraction',
  templateUrl: './tooth-extraction.component.html',
  styleUrls: ['./tooth-extraction.component.sass']
})
export class ToothExtractionComponent {
  dentalFg: FormGroup = this.dentalService.setDentalFormGroup();
  stepsStatus = {
    one: false,
    two: false,
    three: false
  }

  constructor(
    private readonly dentalService: DentalService
  ){}

  setCurrentStep (curStep,stepper:MatStepper) {
    this.stepsStatus[curStep] = true
    this.goNext(stepper);
  }

  goNext(stepper: MatStepper){
    setTimeout(()=>{
      stepper.next()
    }, 1)
  }

}
