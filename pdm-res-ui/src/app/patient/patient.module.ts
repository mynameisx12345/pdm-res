import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientPersonalInfoComponent } from './patient-personal-info/patient-personal-info.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { StoreModule } from '@ngrx/store';
import { civilStatusesReducer, collegeReducer, courseYearsReducer, gendersReducer } from '../maintenance/state/college.state/college.state.reducer';
import { patientReducer } from '../maintenance/state/patient.state/patient.state.reducer';
const routes: Routes = [
  {
    path: '', 
    component: PatientPersonalInfoComponent,
    data: {
      breadcrumb: 'Register'
    }
  }
]

@NgModule({
  declarations: [
    PatientPersonalInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModuleModule,
    StoreModule.forFeature('colleges', collegeReducer),
    StoreModule.forFeature('courseYears',courseYearsReducer),
    StoreModule.forFeature('genders',gendersReducer),
    StoreModule.forFeature('civilStatuses', civilStatusesReducer),
    StoreModule.forFeature('patient',patientReducer)
  ]
})
export class PatientModule { }
