import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, of, startWith, switchMap, take, withLatestFrom } from 'rxjs';
import { getColleges, getCourseYears } from 'src/app/maintenance/state/college.state/college.state.selector';
import { CollegeModel, CourseYear } from 'src/app/shared/model/patient.model';

@Component({
  selector: 'app-patient-personal-info',
  templateUrl: './patient-personal-info.component.html',
  styleUrls: ['./patient-personal-info.component.sass']
})
export class PatientPersonalInfoComponent implements OnInit {
  colleges$:Observable<CollegeModel[]> = this.store.select(getColleges);
  courseYears$ = this.store.select(getCourseYears);

  personalFg: FormGroup;
  filteredCollege:Observable<CollegeModel[]>;
  filteredCourses: Observable<CourseYear[]>;
  testA = this.colleges$.pipe(
    switchMap((value)=>of(null)),
    map((value)=>{
      return null
    }))
  

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ){}

  ngOnInit(): void {

    this.courseYears$.subscribe((c)=>{
      console.log('c',c)
    })

    
    this.personalFg = this.fb.group({
      college: ['',[Validators.required],[this.customValidatorWithinSelection(this.colleges$,'description')]],
      course: ['',[Validators.required],[this.customValidatorWithinSelection(this.courseYears$,'name')]],
    });
    //this.personalFg.get('college').addAsyncValidators(this.customValidatorWithinSelection(this.colleges$))

    this.filteredCollege = this.filterOption('college', this.colleges$);
    this.filteredCourses = this.filterOption('course', this.courseYears$)
    
    
  }

  // filteredCourses ():Observable<CourseYear[]> {
  //   // return this.personalFg.get('course').valueChanges.pipe(
  //   //   //startWith(''),
  //   //   // withLatestFrom(this.personalFg.get('college').valueChanges),
  //   //   // map(([value, selectedCollege])=>{
  //   //   //   return value.filter((course)=>{
  //   //   //     return course.collegeId === selectedCollege
  //   //   //   })
  //   //   // }),
  //   //   withLatestFrom(this.courseYears$),
  //   //   map(([value,courses])=>{
  //   //     return  courses.filter((course)=> {
  //   //       const exist = Object.keys(course).filter((prop)=>{
  //   //         return courses[prop].toLowerCase().includes(value.toLowerCase());
  //   //       })
  //   //       return exist.length > 0;
  //   //     })
  //   //   }),
  //   // )

  //   return this.filterOption('course', this.courseYears$);
  // }

  filterOption(field, observable$:Observable<any>){
    return this.personalFg.get(field).valueChanges.pipe(
      startWith(''),
      withLatestFrom(observable$),
      map(([value,colleges])=>{
        return  colleges.filter((college)=> {
          const exist = Object.keys(college).filter((prop)=>{
            return college[prop].toLowerCase().includes(value.toLowerCase());
          })
          return exist.length > 0;
        })
      }),
    )
  }

  customValidatorWithinSelection(options:Observable<any>, field): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> =>{
      return options.pipe(
          map(options=>{
            let selected = options.filter(college=>college[field] === control.value);
            //console.log('validator',selected, control.value, selected.length > 0 ? null : {validate: 'error'})
            return selected.length > 0 ? null: {validate: 'error'};
          }),
          take(1),
      )
    }
  }
}


