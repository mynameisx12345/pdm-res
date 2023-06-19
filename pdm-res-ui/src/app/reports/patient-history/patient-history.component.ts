import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, tap, withLatestFrom } from 'rxjs';
import { populateUsers } from 'src/app/maintenance/state/patient.state/patient.state.action';
import { getUsers } from 'src/app/maintenance/state/patient.state/patient.state.selector';
import { PatientModel } from 'src/app/shared/model/patient.model';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.sass']
})
export class PatientHistoryComponent implements OnInit{
  //columns = ['studentId','email', 'firstname','lastname','accountType', 'college','course','actions', 'isApproved','menu',];
  columns = {
    studentId: 'ID',
    email: 'Email',
    firstname: 'First Name',
    lastname: 'Last Name',
    menu: ''
  }
  dataSource = [];
  users$ = this.store.select(getUsers);
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.store.dispatch(populateUsers());
    setTimeout(()=>{
      combineLatest([this.users$, this.route.queryParams]).pipe(
        tap(([users, param])=>{
          this.dataSource = users.filter(user=>user.accountType === param['type'])
          //return users
        }),
        // tap((users: PatientModel[])=>{
        //   this.dataSource = users.filter();
        //   console.log('users', this.dataSource)
        //   // this.dataSource.paginator = this.paginator;
        //   // this.dataSource.sort = this.sort;
        // }),
      ).subscribe();
    }, 1000);
    
  }
}
