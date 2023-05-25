<?php namespace App\Models;

use CodeIgniter\Database\ConnectionInterface;

class RequestsModel{
  protected $db;

  public function __construct(ConnectionInterface &$db){
    $this->db =& $db;
  }

  function request($data){
    date_default_timezone_set('Asia/Singapore');
    $curDate = date('Y-m-d H:i:s');
    $reqId = $data->id;
    $isInsert =  !(!!$reqId);
    if($data->status === 'Initiated'){
      $data->dt_initiated = $curDate;
    }

    if($data->status === 'Processing'){
      $data->dt_processed = $curDate;
    }

    if($data->status === 'Completed'){
      $data->dt_completed = $curDate;
    }

    $dataA = get_object_vars($data);
    if($isInsert){
      $this->db->table('requests')
        ->insert($dataA);
      $reqId = $this->db->insertID();
    } else {
      $builder = $this->db->table('requests');
      $builder->where('id', $reqId);
      $builder->update($dataA);
    }

    $ret = ['isInsert' => $isInsert, 'reqId' => $reqId];
    return $ret;
    
  }

  function getRequest($param){
    $builder = $this->db->table('requests');
    $builder->select(
      'requests.id,
      requests.patient_id,
      requests.request_type,
      requests.request_json,
      requests.status,
      requests.dt_initiated,
      requests.dt_processed,
      requests.dt_completed,
      CONCAT(users.last_name, ",", users.first_name) patient_name'
    );
    $builder->orderBy('requests.id', 'DESC');
    $builder->join('users', 'users.id = requests.patient_id');
    if($param->id){
      $builder->where('requests.id',$param->id);
    }

    if($param->patientId){
      $builder->where('requests.patient_id', $param->patientId);
    }

    if($param->requestType){
      $builder->where('requests.request_type', $param->requestType);
    }


    $query = $builder->get()->getResult();

    return $query;
  }

  function resetPassword($email){
   
    $builder = $this->db->table('users');
    $builder->where('email',$email);
    $builder->where('is_approved',true);
    $query = $builder->countAllResults();

    $isEmailExist = true;
   
    if($query === 0){
      $isEmailExist = false;
      return ["message"=>"Invalid Email", "newPassword" => null];
    }
    $newPassword = base64_encode(openssl_random_pseudo_bytes(30));
    $builder = $this->db->table('users');
    $builder->set('password',$newPassword);
    $builder->where('email',$email);
    $builder->update();

    return ["message"=>"Success", "newPassword"=>$newPassword];
  }
}