import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  }
  @Input() set columns(data){
    this.displayedColumns = Object.keys(data);
    this._columns = data;
  }
  _columns = {};
  _data:MatTableDataSource<any> = new MatTableDataSource;

  displayedColumns = []

  ngOnInit(): void {
    console.log(this._data, this._columns);
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
  }
}
