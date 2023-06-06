import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { logout } from 'src/app/maintenance/state/patient.state/patient.state.action';
import { getPatient } from 'src/app/maintenance/state/patient.state/patient.state.selector';
import { PatientService } from 'src/app/patient/patient-personal.service';
import { SharedUtility } from '../../util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  currentPatient$ = this.store.select(getPatient);
  isMobile = this.util.isMobile;
  services = [
    {
      label:'Home', link:'/home'
    },
    {
      label:'Medical Consultation', link:'/medical'
    },
    {
      label:'Dental Consultation', link:'/dental'
    },
    // {
    //   label:'First-Aid Treatment', link:'/first-aid'
    // },
    // {
    //   label:'Health Counselling', link:'/health-counselling'
    // },
  ];

  showLinks = false;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly patientService: PatientService,
    private readonly route: ActivatedRoute,
    private readonly util: SharedUtility
  ){}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe((event:any) => {

          switch(event.url){
            case '/':
            case '/login':
            case '/home':
            case '/patient/register':
            case '/forgot-password':
              this.showLinks =false;
              break;
            default:
              this.showLinks = true;
              break;
          }
      });
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

  onServiceSelect(link){
    this.router.navigate([link]);
  }

  openSummary(type){
    this.router.navigateByUrl(`reports/summary?type=${type}`);
  }
}
