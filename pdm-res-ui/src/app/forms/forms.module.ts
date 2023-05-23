import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalExaminationComponent } from './medical-examination/medical-examination.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { MedicalExaminationPrintComponent } from './medical-examination-print/medical-examination-print.component';
import { ComponentsModule } from '../shared/components/components.module';
import { MedicalClearanceComponent } from './medical-clearance/medical-clearance.component';
import { MedicalClearancePrintComponent } from './medical-clearance-print/medical-clearance-print.component';

const routes: Routes = [
  {
    path: '',
    children : [
      {
        path: 'medical-examination',
        component: MedicalExaminationComponent,
        data: {
          breadcrumb: 'Medical Examination'
        }
      },
      {
        path: 'medical-examination-print',
        component: MedicalExaminationPrintComponent,
        data: {
          breadcrumb: 'Print Medical Examination'
        }
      },
      {
        path: 'medical-clearance',
        component: MedicalClearanceComponent,
        data: {
          breadcrumb: 'Medical Clearance'
        }
      },
      {
        path: 'medical-clearance-print',
        component: MedicalClearancePrintComponent,
        data: {
          breadcrumb: 'Print Medical Clearance'
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    MedicalExaminationComponent,
    MedicalExaminationPrintComponent,
    MedicalClearanceComponent,
    MedicalClearancePrintComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModuleModule,
    ComponentsModule
  ]
})
export class FormsModule { }
