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