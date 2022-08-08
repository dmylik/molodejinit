<?php
header('Content-Type: application/json');
$obj=$_POST['arguments'];
$mas = json_decode($obj,JSON_UNESCAPED_UNICODE);
include '../../../db.php';
$conn = oci_connect($scema, $password , $bd, 'AL32UTF8');

$stid = oci_parse($conn, "ALTER SESSION SET NLS_DATE_FORMAT = 'dd.MM.yyyy'");
oci_execute($stid);

$success = "success";

$stid = oci_parse($conn,"UPDATE MI_LIST
                                SET VNEDR_M =:VNEDR_M, VNEDR_D =:VNEDR_D,   ID_STRUC =:ID_STRUC
                                WHERE ID=:ID");

oci_bind_by_name($stid, ":ID",  $mas[0]['ID']);
oci_bind_by_name($stid, ":VNEDR_M",  $mas[0]['VNEDR_M']);
oci_bind_by_name($stid, ":VNEDR_D",  $mas[0]['VNEDR_D']);
oci_bind_by_name($stid, ":ID_STRUC",  $mas[0]['ID_STRUC']);


oci_execute($stid);

echo json_encode ($success);

oci_free_statement($stid);
oci_close($conn);
?>
