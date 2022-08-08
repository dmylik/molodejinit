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
                                SET VYBOR_NOD =:VYBOR_NOD
                                WHERE ID=:ID");

oci_bind_by_name($stid, ":ID",  $mas[0]['ID']);
oci_bind_by_name($stid, ":VYBOR_NOD",  $mas[0]['VYBOR_NOD']);


oci_execute($stid);

echo json_encode ($success);

oci_free_statement($stid);
oci_close($conn);
?>
