import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PatientState } from "./patient.state";

const getPatientState = createFeatureSelector<PatientState>('patient');
export const getPatient = createSelector(getPatientState, (state)=>{
  return state.patient;
});

const getPatientRequestsState = createFeatureSelector<PatientState>('myRequests');
export const getPatientRequests = createSelector(getPatientRequestsState, (state)=>{
  return state.myRequests;
})