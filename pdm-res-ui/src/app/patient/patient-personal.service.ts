import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, Subject, Subscription, take, takeUntil, tap, withLatestFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { collegeReducer } from "../maintenance/state/college.state/college.state.reducer";
import { getCivilStatuses, getColleges, getCourseYears, getGenders } from "../maintenance/state/college.state/college.state.selector";
import { CivilStatusModel, CollegeModel, Gender, MyRequestsModel, MyRequestsModlI, PatientModel, PatientModelI } from "../shared/model/patient.model";
import * as moment from 'moment';
import { populateColleges, populateCourseYears } from "../maintenance/state/college.state/college.state.action";
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl = environment.apiUrl;
  private userToEdit = new BehaviorSubject<PatientModel>(null);
  userToEdit$ = this.userToEdit.asObservable();
  colleges$:Observable<CollegeModel[]> = this.store.select(getColleges);
  courseYears$ = this.store.select(getCourseYears);
  genders$:Observable<Gender[]> = this.store.select(getGenders);
  civilStatuses$: Observable<CivilStatusModel[]> = this.store.select(getCivilStatuses);

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store
  ){}

  register(data:PatientModel):Observable<any>{
    let formatted: PatientModelI = {
      id: data.id,
      first_name: data.firstname,
      middle_name: data.middlename,
      last_name: data.lastname,
      ext_name: data.ext,
      college_id: data.collegeId,
      course_year_id: data.courseId,
      date_of_birth: data.birthDate,
      gender_id: data.genderId,
      civil_status_id: data.civilStatusId,
      blood_type: data.bloodType,
      place_of_birth: data.birthPlace,
      religion: data.religion,
      nationality: data.nationality,
      email: data.email,
      password: data.password,
      address: data.address,
      contact_number: data.contactNumber,
      contact_person: data.contactPerson,
      contact_person_no: data.contactPerNumber,
      account_type: data.accountType
    }
    
    return this.http.post(`${this.apiUrl}/user/register`,formatted);
  }

  addRequest(data:MyRequestsModel): Observable<any>{
    let formatted: MyRequestsModlI = {
      id: data.id,
      patient_id: data.patientId,
      request_type: data.requestType,
      request_json: data.requestJson,
      status: data.status
    }

    return this.http.post(`${this.apiUrl}/request/add`, formatted);
  }

  getRequest(param): Observable<any>{
    let params = Object.keys(param).map((key)=>`${key}=${param[key]}`);
    return this.http.get(`${this.apiUrl}/request/get?${params.join('&')}`).pipe(
      map((resp:{message:string, request: MyRequestsModlI[]})=>{
        let data: MyRequestsModlI[] = resp.request;
        let formatted: MyRequestsModel[] = []
        data.forEach((a)=>{
          formatted.push( {
            id: a.id,
            patientId: a.patient_id,
            requestType: a.request_type,
            requestJson: a.request_json,
            status: a.status,
            patientName: a.patient_name
          })
        })

        return {...resp, request: formatted};

        
      })
    );
  }

  login(data: {email: string, password: string}){
    return this.http.post(`${this.apiUrl}/user/login`, data).pipe(
      map((resp: {message: string, user: PatientModelI[]})=>{
        let data: PatientModelI = resp.user[0];
        let formatted: PatientModel = {
          id:data.id,
          firstname:data.first_name,
          middlename: data.middle_name,
          lastname: data.last_name,
          ext: data.ext_name,
          collegeId: data.college_id,
          courseId: data.course_year_id,
          birthDate: data.date_of_birth,
          genderId: data.gender_id,
          civilStatusId: data.civil_status_id,
          bloodType: data.blood_type,
          birthPlace: data.place_of_birth,
          religion: data.religion,
          nationality: data.nationality,
          email: data.email,
          password: data.password,
          address: data.address,
          contactNumber: data.contact_number,
          contactPerson: data.contact_person,
          contactPerNumber: data.contact_person_no,
          accountType: data.account_type,
          college: null,
          course: null,
          gender: null,
          civilStatus: null
        };

        return formatted;
      })
    );
  }

  changeUserToEdit(data: PatientModel){
    let subject$ = new Subject;
    combineLatest([this.colleges$, this.courseYears$, this.genders$, this.civilStatuses$]).pipe(
      map(([colleges, courseYears, genders, civilStatuses])=>{
        let [college] = colleges.filter(col=> Number(col.id) === Number(data.collegeId));

        let [courseYear] = courseYears.filter(course=> Number(course.id) === Number(data.courseId));

        let [gender] = genders.filter(gen=> Number(gen.id) === Number(data.genderId));

        let [civilStatus] = civilStatuses.filter(civil=>Number(civil.id) === Number(data.civilStatusId));
     
        let newData = {
          ...data,
          college: college?.description,
          course: courseYear?.name,
          gender: gender?.name,
          civilStatus: civilStatus?.name,
        }
        this.userToEdit.next(newData);
        if(college && courseYear && gender && civilStatus){
          subject$.complete();
        }
      }),
      takeUntil(subject$)
    ).subscribe();
 
  }

  getPatientInfo(id): Observable<PatientModel>{
    // this.store.dispatch(populateColleges());
    // this.store.dispatch(populateCourseYears());
    return this.http.get(`${this.apiUrl}/user/getPatientInfo?id=${id}`).pipe(
      map((resp: {message: string, user:PatientModelI[]})=>{
        let [data] = resp.user;

        
        let formatted: PatientModel = {
          id:data.id,
          firstname:data.first_name,
          middlename: data.middle_name,
          lastname: data.last_name,
          ext: data.ext_name,
          collegeId: data.college_id,
          courseId: data.course_year_id,
          birthDate: data.date_of_birth,
          genderId: data.gender_id,
          civilStatusId: data.civil_status_id,
          bloodType: data.blood_type,
          birthPlace: data.place_of_birth,
          religion: data.religion,
          nationality: data.nationality,
          email: data.email,
          password: data.password,
          address: data.address,
          contactNumber: data.contact_number,
          contactPerson: data.contact_person,
          contactPerNumber: data.contact_person_no,
          accountType: data.account_type,
          college: null,
          course: null,
          gender: null,
          civilStatus: null
        };

        return formatted;
      }),
      withLatestFrom(this.colleges$),
      map(([patientInfo, colleges])=>{
        let [college] = colleges?.filter(col=> Number(col.id) === Number(patientInfo.collegeId));
        patientInfo.college = college?.description;
        return patientInfo
      }),
      withLatestFrom(this.courseYears$),
      map(([patientInfo, courseYears])=>{
        let [courseYear] = courseYears.filter(course=> Number(course.id) === Number(patientInfo.courseId));

        patientInfo.course = courseYear?.name;
        return patientInfo;
      }),
      withLatestFrom(this.genders$),
      map(([patientInfo, genders])=>{
        let [gender] = genders.filter(gen=> Number(gen.id) === Number(patientInfo.genderId));

        patientInfo.gender = gender?.name;
        return patientInfo;
      }),
      withLatestFrom(this.civilStatuses$),
      map(([patientInfo, civilStatuses])=>{
        let [civilStatus] = civilStatuses.filter(civil=>Number(civil.id) === Number(patientInfo.civilStatusId));

        patientInfo.civilStatus = civilStatus?.name;
        return patientInfo;
      })
      
    )
  }
}