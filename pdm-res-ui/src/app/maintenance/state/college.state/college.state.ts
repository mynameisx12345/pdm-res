import { CivilStatusModel, CollegeModel, CourseYear, Gender } from "src/app/shared/model/patient.model";

export interface CollegeState {
  colleges: CollegeModel[]
}

export const intialState: CollegeState = {
  colleges:[]
}

export interface CourseYearState {
  courseYears: CourseYear[]
}

export const intialStateCourseYears: CourseYearState = {
  courseYears: []
}

export interface GenderState {
  genders: Gender[]
}

export const initialStateGender: GenderState = {
  genders: [
    {id:"1", name:'Male'},
    {id:"2", name:'Female'}
  ]
}

export interface CivilStatusState {
  civilStatuses: CivilStatusModel[]
}

export const initialStateCivilStatuses: CivilStatusState = {
  civilStatuses: [
    {id: "1", name: 'Single'},
    {id: "2", name: 'Married'},
    {id: "3", name: 'Widow'},
    {id: "4", name: 'Widower'},
    {id: "5", name: 'Legally Separated'}
  ]
}


