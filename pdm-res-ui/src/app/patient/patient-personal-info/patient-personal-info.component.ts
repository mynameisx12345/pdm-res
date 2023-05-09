import { Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, of, startWith, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { populateColleges, populateCourseYears } from 'src/app/maintenance/state/college.state/college.state.action';
import { getCivilStatuses, getColleges, getCourseYears, getGenders } from 'src/app/maintenance/state/college.state/college.state.selector';
import { registerStart, updateCurrentPatient } from 'src/app/maintenance/state/patient.state/patient.state.action';
import { CivilStatusModel, CollegeModel, CourseYear, Gender } from 'src/app/shared/model/patient.model';
import { PatientService } from '../patient-personal.service';

@Component({
  selector: 'app-patient-personal-info',
  templateUrl: './patient-personal-info.component.html',
  styleUrls: ['./patient-personal-info.component.sass']
})
export class PatientPersonalInfoComponent implements OnInit, OnDestroy {
  colleges$:Observable<CollegeModel[]> = this.store.select(getColleges);
  courseYears$ = this.store.select(getCourseYears);
  genders$:Observable<Gender[]> = this.store.select(getGenders);
  civilStatuses$: Observable<CivilStatusModel[]> = this.store.select(getCivilStatuses);

  personalFg: FormGroup;
  accountFg: FormGroup;
  contactFg: FormGroup;
  filteredCollege:Observable<CollegeModel[]>;
  filteredCourses: Observable<CourseYear[]>;
  filteredGenders: Observable<Gender[]>;
  filteredCivilStatuses: Observable<CivilStatusModel[]>;
  registrationValueInit = null;
  currentDialog: MatDialogRef<any>;

  @ViewChild('dialogBox') dialogBox:TemplateRef<any>;
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly patientService: PatientService
  ){}

  ngOnInit(): void {
    this.initiateMaintenanceData();

    this.personalFg = this.fb.group({
      firstname: ['',[Validators.required]],
      middlename: [''],
      lastname: ['',[Validators.required]],
      ext: [''],
      college: ['',[Validators.required],[this.customValidatorWithinSelection(this.colleges$,'description')]],
      collegeId: [''],
      course: ['',[Validators.required],[this.customValidatorWithinSelection(this.courseYears$,'name')]],
      courseId: [''],
      birthDate: ['', [Validators.required]],
      gender: ['',[Validators.required],[this.customValidatorWithinSelection(this.genders$,'name')]],
      genderId: [''],
      civilStatus: ['',[Validators.required],[this.customValidatorWithinSelection(this.civilStatuses$,'name')]],
      civilStatusId: [''],
      bloodType: [''],
      birthPlace: [''],
      religion: [''],
      nationality: [''],
    });

    this.setDataIds('college', this.colleges$, 'description', 'collegeId');
    this.setDataIds('course', this.courseYears$, 'name','courseId');
    this.setDataIds('gender', this.genders$, 'name', 'genderId');
    this.setDataIds('civilStatus', this.civilStatuses$, 'name', 'civilStatusId');

    this.accountFg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      accountType: ['S']
    });
    this.contactFg = this.fb.group({
      address: [''],
      contactNumber: [''],
      contactPerson: [''],
      contactPerNumber:['']
    })

    this.setInitialValue();

    this.filteredCollege = this.filterOption('college', this.colleges$);
    this.filteredCourses = this.filterOption('course', this.courseYears$);
    this.filteredGenders = this.filterOption('gender', this.genders$);
    this.filteredCivilStatuses = this.filterOption('civilStatus', this.civilStatuses$);
  }

  setDataIds(field, dataList$:Observable<any>, selectedColumn,patchColumn){
    this.personalFg.get(field).valueChanges.pipe(
      withLatestFrom(dataList$),
      map(([college, colleges])=>{
        let [selectedCollege]:any[] = colleges.filter(col=>col[selectedColumn] === college);
        let patch = {};
        patch[patchColumn]= selectedCollege?.id || null
        console.log('patch', patchColumn)
        this.personalFg.patchValue(patch);
        console.log('a', this.personalFg.value)
      })
    ).subscribe();
  }

  setInitialValue(){
    this.registrationValueInit = this.registrationValueCur;
  }

  get registrationValueCur(){
    return {
      ...this.personalFg.value,
      ...this.accountFg.value,
      ...this.contactFg.value
    };
  }

  filterOption(field, observable$:Observable<any>){
    return this.personalFg.get(field).valueChanges.pipe(
      //startWith(''),
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

  cancelRegistration(){
    this.location.back();
  }

  onSubmitRegistration(){
    this.setInitialValue();
    this.store.dispatch(registerStart(this.registrationValueCur));
    // this.patientService.register(this.registrationValueCur).pipe(
    //   tap(()=>{
       
    //   })
    // ).subscribe(()=>{
    //   this.store.dispatch(updateCurrentPatient(this.registrationValueCur));
    //   this.router.navigate(['home']);
    // });

    
  }

  ngOnDestroy(): void {
    // if(JSON.stringify(this.registrationValueCur) !== JSON.stringify(this.registrationValueInit)){
    //   this.currentDialog = this.dialog.open(this.dialogBox, {
    //     disableClose: false,
    //     width: '30%',
    //   })
    // }
  }

  initiateMaintenanceData(){
    this.store.dispatch(populateColleges());
    this.store.dispatch(populateCourseYears());
  }
}


