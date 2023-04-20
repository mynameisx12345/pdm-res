import { CivilStatusModel, CollegeModel, CourseYear, Gender } from "src/app/shared/model/patient.model";

export interface CollegeState {
  colleges: CollegeModel[]
}

export const intialState: CollegeState = {
  colleges:[
    {id:'1', name:'CCS', description: 'College of Computer Studies'},
    {id:'2', name:'CTE', description: 'College of Fisheries'},
  ]
}

export interface CourseYearState {
  courseYears: CourseYear[]
}

export const intialStateCourseYears: CourseYearState = {
  courseYears: [
    {id: '1', name: 'BSIT 4', description: 'Bachelor of Science in Information Technologyy', year: '4', collegeId: '1'},
    {id: '2', name: 'BSCS 4', description: 'Bachelor of Science in Computer Science', year: '4', collegeId: '1'},
    {id: '3', name: 'BSF 4', description: 'Bachelor of Science in Fisheries', year: '4', collegeId: '2'},
  ]
}

export interface GenderState {
  genders: Gender[]
}

export const initialStateGender: GenderState = {
  genders: [
    {id:'1', name:'Male'},
    {id:'2', name:'Female'},
    {id:'2', name:'Others'},
  ]
}

export interface CivilStatusState {
  civilStatuses: CivilStatusModel[]
}

export const initialStateCivilStatuses: CivilStatusState = {
  civilStatuses: [
    {id: '1', name: 'Single'},
    {id: '2', name: 'Married'},
    {id: '3', name: 'Legally Separated'}
  ]
}


