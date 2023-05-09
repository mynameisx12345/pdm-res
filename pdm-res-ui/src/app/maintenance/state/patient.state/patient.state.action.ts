import { createAction, props } from "@ngrx/store";
import { MyRequestsModel, PatientModel } from "src/app/shared/model/patient.model";

export const UPDATE_CURRENT_PATIENT = '[register patient] update current patient';
export const updateCurrentPatient = createAction(UPDATE_CURRENT_PATIENT,props<PatientModel>());

export const ADD_MY_REQUEST = '[patient] add my request';
export const addMyRequest = createAction(ADD_MY_REQUEST, props<MyRequestsModel>());

export const REGISTER_START = '[register patient] start register';

export const registerStart = createAction(REGISTER_START,props<PatientModel>());