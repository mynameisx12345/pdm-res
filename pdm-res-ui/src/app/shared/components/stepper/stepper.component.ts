import { Component, Input, TemplateRef } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.sass']
})
export class StepperComponent {
  stepsStatus = {
    one: false,
    two: false,
    three: false
  }
  @Input() stepOneDisabled: boolean;
  @Input() stepOneContent: TemplateRef<any>;
  @Input() stepTwoContent: TemplateRef<any>;

  constructor(
    private readonly router: Router
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

  done(){
    this.router.navigate(['/home']);
  }
}
