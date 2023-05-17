import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { getPatientRequests } from 'src/app/maintenance/state/patient.state/patient.state.selector';
import { MyRequestsModel } from 'src/app/shared/model/patient.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass']
})
export class RequestsComponent implements OnInit, AfterViewInit{
  requestData$: Observable<MyRequestsModel[]> = this.store.select(getPatientRequests);
  dataSource: MatTableDataSource<MyRequestsModel>;
  columns = ['id', 'requestType','patientName','status','menu'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly store: Store,
    private readonly router: Router
  ){}

  ngOnInit(): void {
    this.requestData$.pipe(
      tap((data)=>{
       this.dataSource = new MatTableDataSource(data);
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },1300)
    
  }

  viewRequest(id){
    this.router.navigateByUrl(`/consultation?id=${id}`);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
