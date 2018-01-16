<?php
/* proxy.php */
$url = $_POST["url"];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec ($ch);
curl_close ($ch);

$result = json_encode($result);

echo $result;

die();