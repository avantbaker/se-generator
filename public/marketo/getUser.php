<?php
 
  $debug = false;
  $marketoCookie = $_POST["marketoCookie"] ? urldecode($_POST["marketoCookie"]) : '';
 
  $marketoSoapEndPoint     = "*****************************";  // CHANGE ME
  $marketoUserId           = "*******************************";  // CHANGE ME
  $marketoSecretKey        = "***********************************";  // CHANGE ME
  $marketoNameSpace        = "***********************************";
 
  // Create Signature
  $dtzObj = new DateTimeZone("America/New_York");
  $dtObj  = new DateTime('now', $dtzObj);
  $timeStamp = $dtObj->format(DATE_W3C);
  $encryptString = $timeStamp . $marketoUserId;
  $signature = hash_hmac('sha1', $encryptString, $marketoSecretKey);
 
  // Create SOAP Header
  $attrs = new stdClass();
  $attrs->mktowsUserId = $marketoUserId;
  $attrs->requestSignature = $signature;
  $attrs->requestTimestamp = $timeStamp;
  $authHdr = new SoapHeader($marketoNameSpace, 'AuthenticationHeader', $attrs);
  $options = array("connection_timeout" => 20, "location" => $marketoSoapEndPoint);
  
  if ($debug) {
    $options["trace"] = true;
  }
 
  // Create Request
  $leadKey = array("keyType" => "COOKIE", "keyValue" => $marketoCookie );
  $leadKeyParams = array("leadKey" => $leadKey);
  $params = array("paramsGetLead" => $leadKeyParams);
  $soapClient = new SoapClient($marketoSoapEndPoint ."?WSDL", $options);
  try {
    $lead = $soapClient->__soapCall('getLead', $params, $options, $authHdr);
  }
  catch(Exception $ex) {
    $leadInfo = array(
      'userid' => '',
      'email' => ''
    );
    echo json_encode($leadInfo);
    exit();
  }
 
  if ($debug) {
    echo '<pre>';
    print "RAW request:\n" .$soapClient->__getLastRequest() ."\n";
    echo '</pre>';
    echo '<pre>';
    print "RAW response:\n" .$soapClient->__getLastResponse() ."\n";
    echo '</pre>';
  }

  $leadInfo = array(
    'userid' => $lead->result->leadRecordList->leadRecord->Id,
    'email' => $lead->result->leadRecordList->leadRecord->Email
  );

  echo json_encode($leadInfo);
 
?>