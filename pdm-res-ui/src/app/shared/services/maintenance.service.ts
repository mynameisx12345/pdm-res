import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  apiUrl = environment.apiUrl;
  constructor (
    private readonly http: HttpClient
  ){}

  populateColleges(){
    return this.http.get(`${this.apiUrl}/getColleges`);
  }

  populateCourseYears(){
    return this.http.get(`${this.apiUrl}/getCourseYears`);
  }
}