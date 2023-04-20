import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ModuleModule } from '../module/module.module';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { StoreModule } from '@ngrx/store';
import { patientReducer } from 'src/app/maintenance/state/patient.state/patient.state.reducer';
import { MedicalComponent } from './medical/medical.component';
import { DentalComponent } from './dental/dental.component';
import { StepperComponent } from './stepper/stepper.component';
import { MedicalPurposeComponent } from './medical/medical-purpose/medical-purpose.component';
import { DentalPurposeComponent } from './dental/dental-purpose/dental-purpose.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    DialogBoxComponent,
    MedicalComponent,
    DentalComponent,
    StepperComponent,
    MedicalPurposeComponent,
    DentalPurposeComponent
  ],
  imports: [
    CommonModule,
    ModuleModule,
    RouterModule,
    StoreModule.forFeature('patient', patientReducer)

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    MedicalComponent,
    DentalComponent,
    StepperComponent,
    MedicalPurposeComponent,
    DentalPurposeComponent
  ]
})
export class ComponentsModule { }
