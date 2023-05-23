import { MyRequestsModel, PatientModel } from "src/app/shared/model/patient.model"

export interface PatientState {
  patient: PatientModel,
  myRequests: MyRequestsModel[],
  users: PatientModel[]
}

export const initialStatePatient: PatientState = {
  patient: null,
  myRequests: [],
  users: []
}
