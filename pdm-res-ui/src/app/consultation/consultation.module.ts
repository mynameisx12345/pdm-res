import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationComponent } from './consultation/consultation.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedUtility } from '../shared/util';

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
    ComponentsModule
  ],
  providers: [
    SharedUtility
  ]
})
export class ConsultationModule { }
