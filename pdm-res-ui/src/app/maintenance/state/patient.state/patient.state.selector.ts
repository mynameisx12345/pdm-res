import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PatientState } from "./patient.state";

const getPatientState = createFeatureSelector<PatientState>('patient');
export const getPatient = createSelector(getPatientState, (state)=>{
  return state.patient;
});

export const getPatientRequests = createSelector(getPatientState, (state)=>{
  return state.myRequests;
})

export const getUsers = createSelector(getPatientState, (state)=>{
  return state.users;
})