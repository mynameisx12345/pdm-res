import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PrintService } from '../../services/print.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.sass']
})
export class ReportTableComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) pagtinator;
  @ViewChild(MatSort) sort;
  @Input() set dataSource(data){
    this._data.data = data;
    //this.printSevice.changeSummary(this._data.data);
    this.origData = data;
  }
  @Input() set columns(data){
    this.displayedColumns = Object.keys(data);
    this._columns = data;
  }
  @Input() showDate = false;
  _columns = {};
  _data:MatTableDataSource<any> = new MatTableDataSource;

  displayedColumns = [];
  datesFg: FormGroup;
  origData = null;

  constructor(
    private readonly printSevice: PrintService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ){}

  ngOnInit(): void {
    console.log(this._data, this._columns);
    this.datesFg = this.fb.group({
      dateFrom: [null],
      dateTo: [null]
    });

    this.datesFg.valueChanges.subscribe(value=>{
      if(value.dateFrom && value.dateTo){
        console.log('data123', this._data, moment(value.dateFrom).format('YYYY-MM-DD'))
        let newData = this._data.data.filter(req=>{
          return moment(req.dtInitiated).format('YYYY-MM-DD') >=  moment(value.dateFrom).format('YYYY-MM-DD') &&
          moment(req.dtInitiated).format('YYYY-MM-DD') <= moment(value.dateTo).format('YYYY-MM-DD') 
          
        })
        console.log('newData', newData)
        this._data.data = newData;
      } else {
        this._data.data = this.origData;
      }
     
    })
  }

  ngAfterViewInit(): void {
    this._data.paginator = this.pagtinator;
    this._data.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._data.filter = filterValue.trim().toLowerCase();
    

    if (this._data.paginator) {
      this._data.paginator.firstPage();
    }
    this.printSevice.changeSummary(this._data.filteredData);
  }

  extractPrescription(action){
    return JSON.parse(action)?.prescription;
  }

  openHistory(patientId){
    this.router.navigateByUrl(`reports/patient-history-details?patientId=${patientId}`)
  }
}
