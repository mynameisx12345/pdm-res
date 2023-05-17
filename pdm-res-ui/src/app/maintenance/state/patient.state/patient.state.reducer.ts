import { act } from "@ngrx/effects";
import { createReducer, on } from "@ngrx/store";
import { initialStatePatient } from "./patient.state";
import { addMyRequest, logout, populateMyRequest, updateCurrentPatient, updateMyRequest } from "./patient.state.action";

const _patientReducer = createReducer(
  initialStatePatient,
  on(updateCurrentPatient,(state,action)=>{
    return {
      ...state,
      patient: action
    }
  }),
  on(logout,(state)=>{
    return {
      ...state,
      patient: null,
      myRequests: []
    }
  }),
  on(populateMyRequest,(state,action)=>{
    let actionI = action.requests;
    return {
      ...state,
      myRequests: actionI
    }
  }),
  on(addMyRequest,(state,action)=>{
    let actionI = action.requests;
    return {
      ...state,
      myRequests: [...actionI, ...state.myRequests]
    }
  }),
  on(updateMyRequest,(state,action)=>{
    //console.log('action123', action);
    let [actionI] = action.requests;
    let updatedRequests = state.myRequests.map((req)=>{
      return Number(req.id) === Number(actionI.id ) ? actionI : req;
    });

    return {
      ...state,
      myRequests: updatedRequests
    }
  })
  );

export function patientReducer (state,action) {
  return _patientReducer(state,action);
}