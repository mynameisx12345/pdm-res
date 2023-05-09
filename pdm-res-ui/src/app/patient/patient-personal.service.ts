import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PatientModel, PatientModelI } from "../shared/model/patient.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl = environment.apiUrl;
  constructor(
    private readonly http: HttpClient
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
}