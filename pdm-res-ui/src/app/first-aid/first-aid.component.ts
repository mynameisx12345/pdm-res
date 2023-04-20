import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MedicalService } from '../shared/components/medical/medical.service';

@Component({
  selector: 'app-first-aid',
  templateUrl: './first-aid.component.html',
  styleUrls: ['./first-aid.component.sass']
})
export class FirstAidComponent {
  medicalFg: FormGroup = this.medicalService.setMedicalFormGroup();
  constructor(
    private readonly medicalService: MedicalService
  ){}

}
