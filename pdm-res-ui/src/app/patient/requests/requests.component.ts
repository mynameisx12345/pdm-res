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

  viewRequest(element){
    let route = '/';
    switch(element.requestType){
      case 'Consultation':
        route = `/consultation?id=${element.id}`;
        break;
      case 'Tooth Extraction':
        route = `/tooth-extraction?id=${element.id}`
        break;
      case 'First-Aid Treatment':
        route = `/first-aid?id=${element.id}`;
        break;
      case 'Health Counselling':
        route = `/health-counselling?id=${element.id}`;
        break;
      case 'Medical Consultation':
        route = `/medical?id=${element.id}`;
        break;
      case 'Dental Consultation':
        route = `/dental?id=${element.id}`;
        break;
    }
    this.router.navigateByUrl(route);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
