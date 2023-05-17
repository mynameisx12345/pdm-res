import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../maintenance/state/patient.state/patient.state.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginFg: FormGroup;
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.loginFg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  
  login(){
    this.store.dispatch(login(this.loginFg.value));
  }
}
