export interface CollegeModel {
  id: string,
  name: string,
  description: string
}

export interface CourseYear {
  id: string,
  name: string,
  description: string,
  year: string,
  collegeId: string,
}

export interface Gender {
  id: string,
  name: string
}

export interface CivilStatusModel {
  id: string,
  name: string
}

export interface PatientModel {
  id: string,
  firstname: string,
  lastname: string,
  ext: string,
  college: string,
  course: string,
  birthDate: string,
  gender: string,
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
  contactPerNumber: string
}