import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CollegeState, CourseYearState } from "./college.state";

const getCollegesState = createFeatureSelector<CollegeState>('colleges');

export const getColleges = createSelector(getCollegesState, (state)=>{
  return state.colleges;
})

const getCourseYearsState = createFeatureSelector<CourseYearState>('courseYears');

export const getCourseYears = createSelector(getCourseYearsState,(state)=>{
  return state.courseYears;
})