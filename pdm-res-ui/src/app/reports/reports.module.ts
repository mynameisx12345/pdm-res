import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryConsultationComponent } from './summary-consultation/summary-consultation.component';
import { ModuleModule } from '../shared/module/module.module';
import { ComponentsModule } from '../shared/components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { patientReducer } from '../maintenance/state/patient.state/patient.state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PatientEffects } from '../maintenance/state/patient.state/patient.state.effects';

const routes: Routes = [
  {
    path: 'summary',
    component: SummaryConsultationComponent,
    data: {
      breadcrumb: 'Report Summary'
    }
  }
]

@NgModule({
  declarations: [
    SummaryConsultationComponent
  ],
  imports: [
    CommonModule,
    ModuleModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('patient',patientReducer),
    EffectsModule.forFeature([PatientEffects])
  ]
})
export class ReportsModule { }
