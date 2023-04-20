import { createReducer, on } from "@ngrx/store";
import { initialStatePatient } from "./patient.state";
import { updateCurrentPatient } from "./patient.state.action";

const _patientReducer = createReducer(
  initialStatePatient,
  on(updateCurrentPatient,(state,action)=>{
    return {
      ...state,
      patient: action
    }
  })
  );

export function patientReducer (state,action) {
  return _patientReducer(state,action);
}