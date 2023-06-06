CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50),
  account_type VARCHAR(50),
  first_name VARCHAR(50),
  middle_name VARCHAR(50),
  last_name VARCHAR(50),
  ext_name VARCHAR(10),
  college_id INT,
  	FOREIGN KEY (college_id) REFERENCES colleges(id),
  course_year_id INT,
   	FOREIGN KEY (course_year_id) REFERENCES course_years(id),
  date_of_birth VARCHAR(15),
  gender_id INT,
    FOREIGN KEY (gender_id) REFERENCES genders(id),
  civil_status_id INT,
    FOREIGN KEY (civil_status_id) REFERENCES civil_statuses(id),
  blood_type VARCHAR(15),
  place_of_birth VARCHAR(100),
  religion VARCHAR(100),
  nationality VARCHAR(100),
  address VARCHAR(100),
  contact_number VARCHAR(20),
  contact_person VARCHAR(100),
  contact_person_no VARCHAR(20),
  password VARCHAR(50)
);


CREATE TABLE colleges (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15),
    description VARCHAR(50)
);

CREATE TABLE course_years (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(15),
  description VARCHAR(50),
  year VARCHAR(10),
  college_id INT,
  FOREIGN KEY (college_id) REFERENCES colleges(id)
);

CREATE TABLE genders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

CREATE TABLE civil_statuses(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
)

CREATE TABLE requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  FOREIGN KEY (patient_id) REFERENCES users(id),
  request_type VARCHAR(50),
  request_json JSON,
  status VARCHAR(20),
  dt_initiated VARCHAR(30),
  dt_processed VARCHAR(30),
  dt_completed VARCHAR(30)
)

CREATE TABLE actions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_type VARCHAR(50),
    data_json JSON,
    dt_added VARCHAR(50)
)