import { createReducer } from "@ngrx/store";
import { initialStateCivilStatuses, initialStateGender, intialState, intialStateCourseYears } from "./college.state";

const _collegesReducer = createReducer(intialState);

export function collegeReducer (state, action){
  return _collegesReducer(state,action);
}

const _courseYearsReducer = createReducer(intialStateCourseYears);

export function courseYearsReducer (state,action){
  return _courseYearsReducer(state,action);
}

const _gendersReducer = createReducer(initialStateGender);

export function gendersReducer (state,action) {
  return _gendersReducer(state,action);
}

const _civilStatusesReducer = createReducer(initialStateCivilStatuses);

export function civilStatusesReducer (state, action) {
  return _civilStatusesReducer(state,action)
}
