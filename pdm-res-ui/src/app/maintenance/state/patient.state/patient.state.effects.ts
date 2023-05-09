import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap, throwError } from "rxjs";
import { PatientService } from "src/app/patient/patient-personal.service";
import { registerStart, updateCurrentPatient } from "./patient.state.action";

@Injectable()
export class PatientEffects {
  constructor(
    private readonly patientService: PatientService,
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
  ){}

  register$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(registerStart),
      exhaustMap((data)=>{
        return this.patientService.register(data).pipe(
          map((response)=>{
            data = {
              ...data,
              id: response.userId
            }
            return updateCurrentPatient(data);
          }),
          tap(()=>{
            this.router.navigate(['home']);
          }),
          catchError((error)=>{
            this.snackbar.open(error.error.message,null,{
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['mat-toolbar','mat-warn']
            });
            return of(error.message)
          })
        )
      })
    )
  })
}