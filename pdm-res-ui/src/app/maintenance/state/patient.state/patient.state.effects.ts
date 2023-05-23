import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap, throwError } from "rxjs";
import { PatientService } from "src/app/patient/patient-personal.service";
import { MyRequestsModel, PatientModel } from "src/app/shared/model/patient.model";
import { addMyRequest, changeStatus, loadUsers, login, logout, populateMyRequest, populateUsers, registerStart, startAddMyRequest, updateCurrentPatient, updateMyRequest, updateStatus, updateUser } from "./patient.state.action";

@Injectable()
export class PatientEffects {
  constructor(
    private readonly patientService: PatientService,
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
  ){}

  updateStatus$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(updateStatus),
      exhaustMap((data)=>{
        return this.patientService.register(data).pipe(
          map((response)=>{
            return updateUser(data);
          })
        )
      })
    )
  })

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
            return logout();
          }),
          tap(()=>{
            this.router.navigate(['login']);
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
  });

  addRequest$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(startAddMyRequest),
      exhaustMap((data)=>{
        return this.patientService.addRequest(data).pipe(
          map((response)=>{
            let initialId = data.id;
            data = {
              ...data,
              id: response.reqId
            }
            if(initialId === null){
              return addMyRequest({requests:[data]});
            } else {
              return updateMyRequest({requests:[data]});
            }
            
          }),
          tap(()=>{
            this.router.navigate(['patient/request']);
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
  });

  changeStatus$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(changeStatus),
      exhaustMap((data)=>{
        return this.patientService.addRequest(data).pipe(
          map((response)=>{
            data = {
              ...data,
              id: response.reqId
            }
            
            return updateMyRequest({requests:[data]});
            
            
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
  });

  

  login$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(login),
      exhaustMap((data)=>{
        return this.patientService.login(data).pipe(
          tap((response)=>{
            sessionStorage.setItem('user', JSON.stringify(response));
          }),
          map((response:PatientModel)=>{
            return updateCurrentPatient(response);
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
  });

  loginSuccessful$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(updateCurrentPatient),
      exhaustMap((data)=>{
        let param = data.accountType === 'A' ? {} : {patientId: data.id};
        return this.patientService.getRequest(param).pipe(
          map((response:{message: string, request: MyRequestsModel[]})=>{
            return populateMyRequest({requests: response.request});
          }))
      })
    )
  });

  populateUsers$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(populateUsers),
      exhaustMap(()=>{
        return this.patientService.getUsers().pipe(
         map((users: PatientModel[])=>{
          return loadUsers({users});
         })
        )
      })
    )
  })
}