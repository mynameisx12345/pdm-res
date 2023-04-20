import { PatientModel } from "src/app/shared/model/patient.model"

export interface PatientState {
  patient: PatientModel
}

export const initialStatePatient: PatientState = {
  patient: null
}
