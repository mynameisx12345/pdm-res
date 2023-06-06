<?php namespace App\Models;

use CodeIgniter\Database\ConnectionInterface;

class MaintenanceModel{
  protected $db;

  public function __construct(ConnectionInterface &$db){
    $this->db =& $db;
  }

  function getColleges(){
    $builder = $this->db->table('colleges');
    $query = $builder->get()->getResult();
    return $query;
  }

  function getCourseYears(){
    $builder = $this->db->table('course_years');
    $query = $builder->get()->getResult();
    return $query;
  }

  function register($data){
    $isInsert = !(!!$data->id);
    
    $dataA = get_object_vars($data);
    // $dataA = [
    //   "email" => $data->email
    // ];
    $userId = null;
    if($isInsert){
      $builder = $this->db->table('users');
      $builder->where('email', $data->email);
      $query = $builder->countAllResults();
      $accountExist = false;

      if($query > 0){
        //$isInsert = false;
        $accountExist = true;
      }
  
      if($accountExist){
        return ['isSuccess'=> false, 'userId' => null];
      }

      $this->db->table('users')
        ->insert($dataA);
      $userId = $this->db->insertID();
    } else {
      $builder = $this->db->table('users');
      $userId = $data->id;
      $builder->where('email', $data->email);
      $builder->update($dataA);
    }

    $ret = ['isSuccess'=> true, 'userId' => $userId];
    return $ret;
  }

  function login($data){
    $builder = $this->db->table('users');
    $builder->where('email', $data->email);
    $builder->where('password', $data->password);
    $builder->where('is_approved',true);
    $query = $builder->get()->getResult();

    return $query;
  }

  function getPatientInfo($id){
    $builder = $this->db->table('users');
    $builder->where('id', $id);
    $query = $builder->get()->getResult();

    return $query;
    //$isInsert = 
  }

  function getUsers(){
    $builder = $this->db->table('users');
    $builder->select(
      'users.*,
      colleges.description as college,
      course_years.name as course,
      (SELECT data_json FROM actions WHERE actions.patient_id = users.id ORDER BY dt_added DESC LIMIT 1 ) actions'
    );
    $builder->join('colleges', 'colleges.id = users.college_id');
    $builder->join('course_years','course_years.id=users.course_year_id');
    $builder->orderBy('users.id', 'DESC');
    $query = $builder->get()->getResult();

    return $query;
  }
}