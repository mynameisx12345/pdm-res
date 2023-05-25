import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthCounsellingComponent } from './health-counselling.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { ComponentsModule } from '../shared/components/components.module';
import { StoreModule } from '@ngrx/store';
import { patientReducer } from '../maintenance/state/patient.state/patient.state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PatientEffects } from '../maintenance/state/patient.state/patient.state.effects';

const routes: Routes = [
  {
    path:'',
    component: HealthCounsellingComponent,
    data: {
      breadcrumb: 'Health Counselling'
    }
  }
]

@NgModule({
  declarations: [
    HealthCounsellingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModuleModule,
    ComponentsModule,
    StoreModule.forFeature('patient', patientReducer),
    EffectsModule.forFeature([PatientEffects])
  ]
})
export class HealthCounsellingModule { }
