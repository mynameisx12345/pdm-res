export interface CollegeModel {
  id: number,
  name: string,
  description: string
}

export interface CourseYear {
  id: number,
  name: string,
  description: string,
  year: string,
  collegeId: string,
}

export interface Gender {
  id: any,
  name: string
}

export interface CivilStatusModel {
  id: any,
  name: string
}

export interface PatientModel {
  id: number,
  firstname: string,
  middlename: string,
  lastname: string,
  ext: string,
  collegeId: number,
  college:string,
  courseId: number,
  course: string,
  birthDate: any,
  genderId: number,
  gender: string,
  civilStatusId: number,
  civilStatus: string,
  bloodType: string,
  birthPlace: string,
  religion: string,
  nationality: string,
  email: string,
  password: string,
  address: string,
  contactNumber: string,
  contactPerson: string,
  contactPerNumber: string,
  accountType: string,
  isApproved?: string,
  studentId: string,
  actions?: string
}

export interface PatientModelI {
  id: number,
  first_name: string,
  middle_name: string,
  last_name: string,
  ext_name: string,
  college_id: number,
  course_year_id: number,
  date_of_birth: string,
  gender_id: number,
  civil_status_id:number,
  blood_type: string,
  place_of_birth: string,
  religion: string,
  nationality: string,
  email: string,
  password: string,
  address: string,
  contact_number: string,
  contact_person: string,
  contact_person_no: string,
  account_type: string,
  is_approved?: string,
  student_id: string,
  college?:string,
  course?:string,
  actions?:string
};

export interface MyRequestsModel {
  id: number,
  patientId: number,
  requestType: string,
  requestJson: string,
  status: string,
  patientName: string,
  dtInitiated?: string,
  dtProcessed?: string,
  dtCompleted?: string,
  college?:string,
  course?:string,
  action?:string
}

export interface MyRequestsModlI {
  id: number,
  patient_id: number,
  request_type: string,
  request_json: string,
  status: string,
  patient_name?: string,
  dt_initiated?: string,
  dt_processed?: string,
  dt_completed?: string,
  college?:string,
  course?:string,
  action?:string
}

export interface Action{
  id: number,
  requestId: number,
  actionType: string,
  data: string,
  patientId: number
}

export interface ActionI{
  id: number,
  request_id: number,
  action_type: string,
  data_json: string,
  patient_id: number
}