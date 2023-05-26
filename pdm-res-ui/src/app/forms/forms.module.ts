import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalExaminationComponent } from './medical-examination/medical-examination.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleModule } from '../shared/module/module.module';
import { MedicalExaminationPrintComponent } from './medical-examination-print/medical-examination-print.component';
import { ComponentsModule } from '../shared/components/components.module';
import { MedicalClearanceComponent } from './medical-clearance/medical-clearance.component';
import { MedicalClearancePrintComponent } from './medical-clearance-print/medical-clearance-print.component';
import { OralHealthComponent } from './oral-health/oral-health.component';
import { OralHealthPrintComponent } from './oral-health-print/oral-health-print.component';
import { ReferralFormComponent } from './referral-form/referral-form.component';
import { ReferralFormPrintComponent } from './referral-form-print/referral-form-print.component';
import { RefusalComponent } from './refusal/refusal.component';
import { RefusalPrintComponent } from './refusal-print/refusal-print.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { LaboratoryPrintComponent } from './laboratory-print/laboratory-print.component';

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
      },
      {
        path: 'oral-health',
        component: OralHealthComponent,
        data: {
          breadcrumb: 'Oral Health Condition'
        }
      },
      {
        path: 'oral-health-print',
        component: OralHealthPrintComponent,
        data: {
          breadcrumb: 'Print Oral Health Condition'
        }
      },
      {
        path: 'referral',
        component: ReferralFormComponent,
        data: {
          breadcrumb: 'Referral Form'
        }
      },
      {
        path: 'referral-print',
        component: ReferralFormPrintComponent,
        data: {
          breadcrumb: 'Print Referral Form'
        }
      },
      {
        path: 'refusal',
        component: RefusalComponent,
        data: {
          breadcrumb: 'Refusal of Care'
        }
      },
      {
        path: 'refusal-print',
        component: RefusalPrintComponent,
        data: {
          breadcrumb: 'Print Refusal of Care'
        }
      },
      {
        path: 'laboratory',
        component: LaboratoryComponent,
        data: {
          breadcrumb: 'Laboratory and Diagnostic Form'
        }
      },
      {
        path: 'laboratory-print',
        component: LaboratoryPrintComponent,
        data: {
          breadcrumb: 'Print Laboratory and Diagnostic Form'
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
    MedicalClearancePrintComponent,
    OralHealthComponent,
    OralHealthPrintComponent,
    ReferralFormComponent,
    ReferralFormPrintComponent,
    RefusalComponent,
    RefusalPrintComponent,
    LaboratoryComponent,
    LaboratoryPrintComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModuleModule,
    ComponentsModule
  ]
})
export class FormsModule { }
