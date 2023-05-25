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
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RequestStatusComponent } from './request-status/request-status.component';
import { PrintHeaderComponent } from './print-header/print-header.component';
import { civilStatusesReducer, collegeReducer, courseYearsReducer, gendersReducer } from 'src/app/maintenance/state/college.state/college.state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MaintenanceEffects } from 'src/app/maintenance/state/college.state/college.effects';
import { PatientEffects } from 'src/app/maintenance/state/patient.state/patient.state.effects';
import { ReportTableComponent } from './report-table/report-table.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';




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
    DentalPurposeComponent,
    AdminPanelComponent,
    RequestStatusComponent,
    PrintHeaderComponent,
    ReportTableComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ModuleModule,
    RouterModule,
    StoreModule.forFeature('patient', patientReducer),
    StoreModule.forFeature('colleges', collegeReducer),
    StoreModule.forFeature('courseYears',courseYearsReducer),
    StoreModule.forFeature('genders',gendersReducer),
    StoreModule.forFeature('civilStatuses', civilStatusesReducer),
    EffectsModule.forFeature([MaintenanceEffects]),
    EffectsModule.forFeature([PatientEffects])

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    MedicalComponent,
    DentalComponent,
    StepperComponent,
    MedicalPurposeComponent,
    DentalPurposeComponent,
    AdminPanelComponent,
    RequestStatusComponent,
    PrintHeaderComponent,
    ReportTableComponent
  ]
})
export class ComponentsModule { }
