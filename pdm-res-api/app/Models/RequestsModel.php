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

    $query = $builder->get()->getResult();

    return $query;
  }
}