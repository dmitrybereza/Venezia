<?php

$json = file_get_contents('../limestone.json');
$json = json_decode($json, true);

$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>ФИО: '.$_POST['eFIO'].'</p>';
$message .= '<p>Номер телефона: '.$_POST['eNUM'].'</p>';
$message .= '<p>Электронная почта: '.$_POST['email'].'</p>';
$message .= '<p>Город: '.$_POST['eCity'].'</p>';
$message .= '<p>Отделение Новой почты: '.$_POST['ePost'].'</p>';

$card = $_POST['card'];
$sum = 0;
foreach($card as $id=>$count){
        $message .=$json[$id]['name'].' ----- ';
        $message .=$count.' ----- ';
        $message .=$count*$json[$id]['cost'];
        $message .='<br>';
        $sum = $sum + $count*$json[$id]['cost'];
}
$message .='Всего: '.$sum.' Грн';

$to = 'veneziadnepr@gmail.com'.',';
$to .= $_POST['email'];
$spectext ='<!DOCKTYPE html><html><head><title>Заказ</title></head><body>';
$headers ='MIME-Version: 1.0'."\r\n";
$headers .= 'Content-type: text/html; charset=utf-8'."\r\n";

$m = mail($to, 'Заказ в магазине', $spectext.$message.'</body></html>', $headers);
if($m) {echo 1;} else {echo 0;}
?>