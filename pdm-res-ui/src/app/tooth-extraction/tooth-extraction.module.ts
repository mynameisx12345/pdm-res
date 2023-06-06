import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToothExtractionComponent } from './tooth-extraction.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ModuleModule } from '../shared/module/module.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { patientReducer } from '../maintenance/state/patient.state/patient.state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PatientEffects } from '../maintenance/state/patient.state/patient.state.effects';

const routes: Routes = [
  {
    path: '',
    component: ToothExtractionComponent,
    data: {
      breadcrumb: 'Dental Consultation'
    }
  }
]

@NgModule({
  declarations: [ToothExtractionComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ModuleModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('patient', patientReducer),
    EffectsModule.forFeature([PatientEffects])
  ]
})
export class ToothExtractionModule { }
