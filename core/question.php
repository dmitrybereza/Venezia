<?php

$message = '';
$message .= '<h1>Вопрос от клиента</h1>';
$message .= '<p>ФИО: '.$_POST['eFIO'].'</p>';
$message .= '<p>Электронная почта: '.$_POST['email'].'</p>';
$message .= '<p>Вопрос: '.$_POST['eText'].'</p>';

$to = 'veneziadnepr@gmail.com';
$spectext ='<!DOCKTYPE html><html><head><title>Заказ</title></head><body>';
$headers ='MIME-Version: 1.0'."\r\n";
$headers .= 'Content-type: text/html; charset=utf-8'."\r\n";

$m = mail($to, 'Вопрос от клиента', $spectext.$message.'</body></html>', $headers);
if($m) {echo 1;} else {echo 0;}
?>