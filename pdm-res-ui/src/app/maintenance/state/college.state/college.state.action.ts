import { createAction, props } from "@ngrx/store";
import { CollegeModel, CourseYear } from "src/app/shared/model/patient.model";

export const POPULATE_COLLEGES = '[populate colleges]';
export const POPULATE_COURSE_YEARS = '[populate course years]';
export const LOAD_COLLEGES = '[load colleges]';
export const LOAD_COURSE_YEARS = '[load course years]';

export const populateColleges = createAction(POPULATE_COLLEGES);
export const loadColleges = createAction(LOAD_COLLEGES,props<{data:CollegeModel[]}>());

export const populateCourseYears = createAction(POPULATE_COURSE_YEARS);
export const loadCourseYears = createAction(LOAD_COURSE_YEARS, props<{data:CourseYear[]}>());