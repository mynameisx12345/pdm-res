import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientPersonalInfoComponent } from './patient-personal-info/patient-personal-info.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { StoreModule } from '@ngrx/store';
import { collegeReducer, courseYearsReducer } from '../maintenance/state/college.state/college.state.reducer';
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
  ]
})
export class PatientModule { }
