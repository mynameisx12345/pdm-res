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
import { PrintTableComponent } from '../shared/components/print-table/print-table.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { PatientHistoryDetailsComponent } from './patient-history-details/patient-history-details.component';

const routes: Routes = [
  {
    path: 'summary',
    component: SummaryConsultationComponent,
    data: {
      breadcrumb: 'Report Summary'
    }
  },
  {
    path: 'summary-print',
    component: PrintTableComponent,
    data: {
      breadcrumb: 'Print Report Summary'
    }
  },
  {
    path: 'patient-history',
    component: PatientHistoryComponent,
    data: {
      breadcrumb: 'Patient History'
    }
  },
  {
    path: 'patient-history-details',
    component: PatientHistoryDetailsComponent,
    data: {
      breadcrumb: 'Patient History Details'
    }
  },
]

@NgModule({
  declarations: [
    SummaryConsultationComponent,
    PatientHistoryComponent,
    PatientHistoryDetailsComponent
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
