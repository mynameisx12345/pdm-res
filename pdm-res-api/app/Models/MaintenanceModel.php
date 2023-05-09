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
    $builder = $this->db->table('users');
    $builder->where('email', $data->email);
    $query = $builder->countAllResults();

    $isInsert = true;
    if($query > 0){
      $isInsert = false;
    }
    
 
    $dataA = get_object_vars($data);
    // $dataA = [
    //   "email" => $data->email
    // ];
    $userId = null;
    if($isInsert){
      $this->db->table('users')
        ->insert($dataA);
      $userId = $this->db->insertID();
    }

    $ret = ['isInsert'=> $isInsert, 'userId' => $userId];
    return $ret;
  }
}