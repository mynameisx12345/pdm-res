import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, tap } from "rxjs";
import { CollegeModel, CourseYear } from "src/app/shared/model/patient.model";
import { MaintenanceService } from "src/app/shared/services/maintenance.service";
import { loadColleges, loadCourseYears, populateColleges, populateCourseYears } from "./college.state.action";
@Injectable()
export class MaintenanceEffects{
  constructor(
    private actions$: Actions,
    private readonly maintenanceService: MaintenanceService,
  ){}

  getColleges$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(populateColleges),
      exhaustMap(()=>{
        return this.maintenanceService.populateColleges().pipe(
          map((data:any)=>{
            let output: CollegeModel[] = data.map((a)=>{
              return {id:a.id, name: a.name, description: a.description};
            })
            return loadColleges({data:output});
          })
        )
      })
    )
  });

  getCourseYears$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(populateCourseYears),
      exhaustMap(()=>{
        return this.maintenanceService.populateCourseYears().pipe(
          map((data:any)=>{
            let output: CourseYear[] = data.map((a)=>{
              return {id:a.id, name:a.name, description:a.description, year:a.year, collegeId: a.college_id}
            })
            return loadCourseYears({data:output});
          })
        )
      })
    )
  })
}