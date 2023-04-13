import { CollegeModel, CourseYear } from "src/app/shared/model/patient.model";

export interface CollegeState {
  colleges: CollegeModel[]
}

export const intitialState: CollegeState = {
  colleges:[
    {id:'1', name:'CCS', description: 'College of Computer Studies'},
    {id:'2', name:'CTE', description: 'College of Fisheries'},
  ]
}

export interface CourseYearState {
  courseYears: CourseYear[]
}

export const intitialStateCourseYears: CourseYearState = {
  courseYears: [
    {id: '1', name: 'BSIT 4', description: 'Bachelor of Science in Information Technologyy', year: '4', collegeId: '1'},
    {id: '2', name: 'BSCS 4', description: 'Bachelor of Science in Computer Science', year: '4', collegeId: '1'},
    {id: '3', name: 'BSF 4', description: 'Bachelor of Science in Fisheries', year: '4', collegeId: '2'},
  ]
}