<?php

namespace App\Controllers;

use App\Models\RequestsModel;

class RequestsController extends BaseController
{
  public function request(){
    $db = db_connect();
    
    $model = new RequestsModel($db);
    $data = $this->request->getJSON();
    $ret = $model->request($data);

    //if($ret['isInsert']){
      return $this->response
      ->setStatusCode(200)
      ->setJson(["message"=>"Success", "reqId"=>$ret['reqId']]);
   // }
  }

  public function getRequest(){
    $db = db_connect();

    $param = (object) [
      'patientId' => $this->request->getGet('patientId'),
      'id' =>  $this->request->getGet('id')
    ];

    $model = new RequestsModel($db);
    $ret = $model->getRequest($param);

    return $this->response
      ->setStatusCode(200)
      ->setJson(['message'=>'Success', 'request'=>$ret]);
  }
}