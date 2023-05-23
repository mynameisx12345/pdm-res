import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { ModuleModule } from '../shared/module/module.module';
import { ComponentsModule } from '../shared/components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { patientReducer } from './state/patient.state/patient.state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PatientEffects } from './state/patient.state/patient.state.effects';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    data: {
      breadcrumb: 'User List'
    }
  }
]

@NgModule({
  declarations: [
  
    UserListComponent
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
export class MaintenanceModule { }
