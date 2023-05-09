import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationComponent } from './consultation/consultation.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedUtility } from '../shared/util';
import { StoreModule } from '@ngrx/store';
import { patientReducer } from '../maintenance/state/patient.state/patient.state.reducer';

const routes: Routes = [
  {
    path: '',
    component: ConsultationComponent,
    data: {
      breadcrumb:'Consultation'
    }
  }
]

@NgModule({
  declarations: [
    ConsultationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModuleModule,
    ComponentsModule,
    StoreModule.forFeature('patient', patientReducer)
  ],
  providers: [
    SharedUtility
  ]
})
export class ConsultationModule { }
