<?php
header('Content-Type: application/json');
$obj=$_POST['arguments'];
$mas = json_decode($obj,JSON_UNESCAPED_UNICODE);

 include '../../../db.php';

$conn = oci_connect($scema, $password , $bd, 'AL32UTF8');
$stid = oci_parse($conn, "ALTER SESSION SET NLS_DATE_FORMAT = 'DD.MM.YYYY'");
oci_execute($stid);

$stid = oci_parse($conn,'DELETE FROM MI_LIST WHERE ID=:id');

oci_bind_by_name($stid, ":id", $mas[0]['ID']);

oci_execute($stid);

$data = "success";
echo json_encode ($data);

oci_free_statement($stid);
oci_close($conn);

?>
