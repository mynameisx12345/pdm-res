import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';

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
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'Login'
    },
    //canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      breadcrumb: 'Password Reset'
    },
    //canActivate: [AuthGuard]
  },
  {
    path: 'patient',
    loadChildren: ()=> import('./patient/patient.module').then(m=>m.PatientModule)
  },
  {
    path: 'consultation',
    loadChildren: () => import('./consultation/consultation.module').then(m=>m.ConsultationModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dental',
    loadChildren: () => import('./tooth-extraction/tooth-extraction.module').then(m=>m.ToothExtractionModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'medical',
    loadChildren: () => import('./first-aid/first-aid.module').then(m=>m.FirstAidModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then(m=>m.FormsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then(m=>m.MaintenanceModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'health-counselling',
    loadChildren: () => import('./health-counselling/health-counselling.module').then(m=>m.HealthCounsellingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m=>m.ReportsModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
