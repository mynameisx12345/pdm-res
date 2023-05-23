import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, take, tap, withLatestFrom } from 'rxjs';
import { logout } from 'src/app/maintenance/state/patient.state/patient.state.action';
import { getPatient } from 'src/app/maintenance/state/patient.state/patient.state.selector';
import { PatientService } from 'src/app/patient/patient-personal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  currentPatient$ = this.store.select(getPatient);
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly patientService: PatientService
  ){}

  ngOnInit(): void {
  }

  register(){
    this.router.navigate(['/patient/register']);
  }

  openSignInForm(){
    this.router.navigate(['login']);
  }

  openRequestList(){
    this.router.navigate(['/patient/request']);
  }

  signOut(){
    sessionStorage.removeItem('user');
    this.store.dispatch(logout());
    this.router.navigate(['home']);
  }

  goHome(){
    this.router.navigate(['home']);
  }

  openInfo(){
    this.currentPatient$.pipe(
      take(1),
      tap((currentPatient)=>{
        this.patientService.changeUserToEdit(currentPatient);
        this.router.navigateByUrl(`/patient/register?id=${currentPatient.id}`);
      })).subscribe();
  }

  openUserList(){
    this.router.navigate(['maintenance/user-list'])
  }
}
