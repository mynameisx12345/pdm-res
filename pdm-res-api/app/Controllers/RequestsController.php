<?php

namespace App\Controllers;


use App\Models\RequestsModel;

class RequestsController extends BaseController
{
  function index(){
    $this->load->library('email');
  }
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
      'id' =>  $this->request->getGet('id'),
      'requestType' => $this->request->getGet('requestType')
    ];

    $model = new RequestsModel($db);
    $ret = $model->getRequest($param);

    return $this->response
      ->setStatusCode(200)
      ->setJson(['message'=>'Success', 'request'=>$ret]);
  }

  public function resetPassword(){
    $db = db_connect();
    
    $model = new RequestsModel($db);
    $email = $this->request->getGet('email');
    $ret = $model->resetPassword($email);
   
    if($ret['message'] !== 'Success'){
      return $this->response
        ->setStatusCode(500)
        ->setJson(['message'=>$ret['message']]);
    }

    $emailInfo = (object)[
      "email" => $email,
      "newPassword" => $ret['newPassword']
    ];

    $this->sendEmail($emailInfo);

    return $this->response
      ->setStatusCode(200)
      ->setJson(['message'=>'Success', "newPassword"=>$ret['newPassword']]);
  }


  function sendEmail($patientInfo){
    // $from_email = 'medicalanddentalrecords@gmail.com';
    $to = $patientInfo->email;
    $subject = 'Patient Medical and Dental Record System [Password Reset]';
    $message = 'Your new temporary password is ' . $patientInfo->newPassword;
    // $email = \Config\Services::email();
    
    // $email->setTo($to);
    // $email->setFrom($from_email, 'Confirm Registration');
    
    // $email->setSubject($subject);
    // $email->setMessage($message);
     
      if( mail($to,$subject,$message,'From: System Administrator')){
        echo "success";
      } else {
        echo "fail";
      }
    // if ($email->send()) 
    // {
    //         echo 'Email successfully sent';
    //     } 
    // else 
    // {
    //         $data = $email->printDebugger(['headers']);
    //         print_r($data);
    //     }
  }

  public function action(){
    $db = db_connect();
    
    $model = new RequestsModel($db);
    $data = $this->request->getJSON();
    $ret = $model->action($data);

    return $this->response
    ->setStatusCode(200)
    ->setJson(['message'=>'Success', "isInsert"=>'']);
  }

  public function getAction(){
    $db = db_connect();
    
    $model = new RequestsModel($db);
    $requestId = $this->request->getGet('request_id');

    $ret = $model->getAction($requestId);

    return $this->response
    ->setStatusCode(200)
    ->setJson(['message'=>'Success', "action"=>$ret]);
  }
}