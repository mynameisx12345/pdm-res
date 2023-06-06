import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { populateUsers, updateStatus } from '../state/patient.state/patient.state.action';
import { getUsers } from '../state/patient.state/patient.state.selector';
import { MatTableDataSource } from '@angular/material/table';
import { take, tap } from 'rxjs';
import { PatientModel } from 'src/app/shared/model/patient.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns = ['studentId','email', 'firstname','lastname','accountType', 'college','course','actions', 'isApproved','menu',];
  users$ = this.store.select(getUsers);
  dataSource = new MatTableDataSource<PatientModel>;
  constructor(
    private readonly store: Store
  ){}
 
  ngOnInit(): void {
    this.store.dispatch(populateUsers());
    setTimeout(()=>{
      this.users$.pipe(
        tap((users: PatientModel[])=>{
          this.dataSource.data = users;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }),
      ).subscribe();
    }, 1000);
    
  }

  ngAfterViewInit(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approve(data:PatientModel){
    console.log('arove', data);
    let newData:PatientModel = {
      ...data,
      accountType: data.accountType === 'Student' ? 'S' : (data.accountType === 'Faculty' ? 'F' : 'A'),
      isApproved: '1'
    }

    this.store.dispatch(updateStatus(newData));
  }

  extractPrescription(data){
    return JSON.parse(data)?.prescription;
  }

}
