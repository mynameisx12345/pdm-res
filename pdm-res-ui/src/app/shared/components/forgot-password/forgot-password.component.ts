import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of, take, tap } from 'rxjs';
import { PatientService } from 'src/app/patient/patient-personal.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit{
  resetFg: FormGroup;
  isLoading = false;
  constructor(
    private readonly patientService: PatientService,
    private readonly snackbar: MatSnackBar,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ){}

  ngOnInit(): void {
    this.resetFg = this.fb.group({
      email:['',[Validators.required, Validators.email]]
    })
  }

  resetPassword(email){
    this.isLoading = true;
    this.patientService.resetPassword(email).pipe(
      catchError((error)=>{
        this.snackbar.open(error.error.message,null,{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-toolbar','mat-warn']
        });
        return of(error.error.message);
      }),
      take(1),
      tap(()=>{
        this.snackbar.open('Check your email for the temporary password',null,{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-toolbar','mat-warn']
        });
        this.router.navigate(['/login']);
      })
    ).subscribe();
  }
}
