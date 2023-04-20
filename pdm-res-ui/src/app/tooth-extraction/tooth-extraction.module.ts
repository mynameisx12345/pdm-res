import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToothExtractionComponent } from './tooth-extraction.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ModuleModule } from '../shared/module/module.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ToothExtractionComponent,
    data: {
      breadcrumb: 'Tooth Extraction'
    }
  }
]

@NgModule({
  declarations: [ToothExtractionComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class ToothExtractionModule { }
