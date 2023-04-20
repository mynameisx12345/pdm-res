import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CivilStatusState, CollegeState, CourseYearState, GenderState } from "./college.state";

const getCollegesState = createFeatureSelector<CollegeState>('colleges');

export const getColleges = createSelector(getCollegesState, (state)=>{
  return state.colleges;
})

const getCourseYearsState = createFeatureSelector<CourseYearState>('courseYears');

export const getCourseYears = createSelector(getCourseYearsState,(state)=>{
  return state.courseYears;
})

const getGendersState = createFeatureSelector<GenderState>('genders');

export const getGenders = createSelector(getGendersState, (state)=>{
  return state.genders;
})

const getCivilStatusesState = createFeatureSelector<CivilStatusState>('civilStatuses');
export const getCivilStatuses = createSelector(getCivilStatusesState, (state)=>{
  return state.civilStatuses;
})