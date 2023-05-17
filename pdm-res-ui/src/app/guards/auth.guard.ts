import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateCurrentPatient } from '../maintenance/state/patient.state/patient.state.action';
import { getPatientRequests } from '../maintenance/state/patient.state/patient.state.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private store: Store
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let currentUser = JSON.parse(sessionStorage.getItem('user'));
    if(currentUser){
      this.store.dispatch(updateCurrentPatient(currentUser));
      return true;
    } else {
     this.router.navigate(['login']);
     return false;
    }
    
  }
}