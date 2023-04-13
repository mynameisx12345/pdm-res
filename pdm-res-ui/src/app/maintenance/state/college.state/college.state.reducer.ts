import { createReducer } from "@ngrx/store";
import { intitialState, intitialStateCourseYears } from "./college.state";

const _collegesReducer = createReducer(intitialState);

export function collegeReducer (state, action){
  return _collegesReducer(state,action);
}

const _courseYearsReducer = createReducer(intitialStateCourseYears);

export function courseYearsReducer (state,action){
  return _courseYearsReducer(state,action);
}