import { createReducer, on } from "@ngrx/store";
import { initialStateCivilStatuses, initialStateGender, intialState, intialStateCourseYears } from "./college.state";
import { loadColleges, loadCourseYears } from "./college.state.action";

const _collegesReducer = createReducer(intialState,
  on(loadColleges,(state,action)=>{
    
    return {
      ...state,
      colleges: action.data
    }
  }));

export function collegeReducer (state, action){
  return _collegesReducer(state,action);
}

const _courseYearsReducer = createReducer(intialStateCourseYears,
  on(loadCourseYears,(state,action)=>{
    return {
      ...state,
      courseYears: action.data
    }
  }));

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
