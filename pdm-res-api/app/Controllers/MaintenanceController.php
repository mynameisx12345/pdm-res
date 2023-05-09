<?php

namespace App\Controllers;

use App\Models\MaintenanceModel;

class MaintenanceController extends BaseController
{
   public function getColleges(){
     $db = db_connect();
     $model = new MaintenanceModel($db);
     $result = $model->getColleges();

     return $this->response 
        ->setStatusCode(200)
        ->setJson($result);
   }

   public function getCourseYears(){
    $db = db_connect();
    $model = new MaintenanceModel($db);
    $result = $model->getCourseYears();

    return $this->response 
       ->setStatusCode(200)
       ->setJson($result);
  }

  public function register(){
    $db = db_connect();
    $model = new MaintenanceModel($db);
    $data = $this->request->getJSON();
    $ret = $model->register($data);

    if($ret['isInsert']){
      return $this->response
      ->setStatusCode(200)
      ->setJson(["message"=>"Success", "userId"=>$ret['userId']]);
    } else {
      return $this->response
      ->setStatusCode(500)
      ->setJson(["message"=>"Email Exist"]);
    }
  }
}
