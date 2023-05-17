import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { populateColleges, populateCourseYears } from 'src/app/maintenance/state/college.state/college.state.action';

@Component({
  selector: 'app-print-header',
  templateUrl: './print-header.component.html',
  styleUrls: ['./print-header.component.sass']
})
export class PrintHeaderComponent implements OnInit {
  constructor(
    private readonly store: Store
  ){}

  ngOnInit(): void {
    this.store.dispatch(populateColleges());
    this.store.dispatch(populateCourseYears());
  }
}
