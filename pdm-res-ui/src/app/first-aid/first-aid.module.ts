import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstAidComponent } from './first-aid.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { ComponentsModule } from '../shared/components/components.module';

const routes: Routes = [
  {
    path:'',
    component: FirstAidComponent,
    data: {
      breadcrumb: 'First-aid Treatment'
    }
  }
]

@NgModule({
  declarations: [
    FirstAidComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModuleModule,
    ComponentsModule
  ]
})
export class FirstAidModule { }
