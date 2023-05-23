import { act } from "@ngrx/effects";
import { createReducer, on } from "@ngrx/store";
import { initialStatePatient } from "./patient.state";
import { addMyRequest, loadUsers, logout, populateMyRequest, updateCurrentPatient, updateMyRequest, updateUser } from "./patient.state.action";

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
  }),
  on(loadUsers,(state,action)=>{
    return {
      ...state,
      ...action
    }
  }),
  on(updateUser,(state,action)=>{
    console.log('action',action);
    let updatedusers = state.users.map((user)=>{
      
      let accountTypes = {
        'S' : 'Student',
        'F' : 'Faculty',
        'A' : 'Administrator',
        'Student' : 'Student',
        'Faculty' : 'Faculty',
        'Administrator' : 'Administrator'
      }

      let isApproves = {
        '1' : 'Yes',
        'Yes' : 'Yes',
        'No' : 'No'
      }


      let dataToReturn = Number(user.id) === Number(action.id) ? action : user; 
      return {
        ...dataToReturn,
        isApproved: isApproves[dataToReturn.isApproved],
        accountType: accountTypes[dataToReturn.accountType]
      }

    })
    return {
      ...state,
      users: updatedusers
    }
  })
);

export function patientReducer (state,action) {
  return _patientReducer(state,action);
}