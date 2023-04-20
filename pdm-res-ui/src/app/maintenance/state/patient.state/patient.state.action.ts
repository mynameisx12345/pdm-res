import { createAction, props } from "@ngrx/store";
import { PatientModel } from "src/app/shared/model/patient.model";

export const UPDATE_CURRENT_PATIENT = '[register patient] update current patient';
export const updateCurrentPatient = createAction(UPDATE_CURRENT_PATIENT,props<PatientModel>())