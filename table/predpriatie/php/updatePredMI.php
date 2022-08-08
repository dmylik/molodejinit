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
                                SET ID_ORG =:ID_ORG, NUM_PP =:NUM_PP, DATE_REG =:DATE_REG, NAME =:NAME, AUTORS =:AUTORS, ID_NOMINAC =:ID_NOMINAC, ZNACHIM =:ZNACHIM
                                WHERE ID=:ID");


oci_bind_by_name($stid, ":ID",  $mas[0]['ID']);
oci_bind_by_name($stid, ":ID_ORG",  $mas[0]['ID_ORG']);
oci_bind_by_name($stid, ":NUM_PP",  $mas[0]['NUM_PP']);
oci_bind_by_name($stid, ":DATE_REG",  $mas[0]['DATE_REG']);
oci_bind_by_name($stid, ":NAME",  $mas[0]['NAME']);
oci_bind_by_name($stid, ":AUTORS",  $mas[0]['AUTORS']);
oci_bind_by_name($stid, ":ID_NOMINAC",  $mas[0]['ID_NOMINAC']);
oci_bind_by_name($stid, ":ZNACHIM",  $mas[0]['ZNACHIM']);


oci_execute($stid);

echo json_encode ($success);

oci_free_statement($stid);
oci_close($conn);
?>