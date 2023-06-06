import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientPersonalInfoComponent } from './patient-personal-info/patient-personal-info.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { StoreModule } from '@ngrx/store';
import { civilStatusesReducer, collegeReducer, courseYearsReducer, gendersReducer } from '../maintenance/state/college.state/college.state.reducer';
import { patientReducer } from '../maintenance/state/patient.state/patient.state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MaintenanceEffects } from '../maintenance/state/college.state/college.effects';
import { PatientEffects } from '../maintenance/state/patient.state/patient.state.effects';
import { RequestsComponent } from './requests/requests.component';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: PatientPersonalInfoComponent,
        data: {
          breadcrumb: 'Information'
        }
      },
      {
        path: 'request',
        component: RequestsComponent,
        data: {
          breadcrumb: 'Patients Request'
        },
        canActivate: [AuthGuard],
      }
    ]
  },
 
]

@NgModule({
  declarations: [
    PatientPersonalInfoComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModuleModule,
    StoreModule.forFeature('colleges', collegeReducer),
    StoreModule.forFeature('courseYears',courseYearsReducer),
    StoreModule.forFeature('genders',gendersReducer),
    StoreModule.forFeature('civilStatuses', civilStatusesReducer),
    StoreModule.forFeature('patient',patientReducer),
    EffectsModule.forFeature([MaintenanceEffects]),
    EffectsModule.forFeature([PatientEffects])
  ]
})
export class PatientModule { }
