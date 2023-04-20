import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Home'
    },
    // children: [
    //   {
    //     path: 'register',
    //     loadChildren: ()=> import('./patient/patient.module').then(m=>m.PatientModule)
    //   },
    // ]
    //loadChildren: ()=> import('./patient/patient.module').then(m=>m.PatientModule)
  },
  {
    path: 'register',
    loadChildren: ()=> import('./patient/patient.module').then(m=>m.PatientModule)
  },
  {
    path: 'consultation',
    loadChildren: () => import('./consultation/consultation.module').then(m=>m.ConsultationModule)
  },
  {
    path: 'tooth-extraction',
    loadChildren: () => import('./tooth-extraction/tooth-extraction.module').then(m=>m.ToothExtractionModule)
  },
  {
    path: 'first-aid',
    loadChildren: () => import('./first-aid/first-aid.module').then(m=>m.FirstAidModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
