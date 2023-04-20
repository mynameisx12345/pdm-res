import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPatient } from 'src/app/maintenance/state/patient.state/patient.state.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  currentPatient$ = this.store.select(getPatient);
  constructor(
    private readonly store: Store,
    private readonly router: Router
  ){}

  ngOnInit(): void {
  }

  register(){
    this.router.navigate(['register']);
  }


}
