<?php
header('Content-Type: application/json');
$obj=$_POST['arguments'];
$mas = json_decode($obj,JSON_UNESCAPED_UNICODE);

 include '../../../db.php';
$conn = oci_connect($scema, $password , $bd, 'AL32UTF8');

$success = "success";

$stid1 = oci_parse($conn,"SELECT ID_MAIN, ID_SLUZH  FROM DOROGA_ORG WHERE INDEX_ORG = :ID_ORG");
oci_bind_by_name($stid1, ":ID_ORG",  $mas[0]['ID_ORG']);
oci_execute($stid1);

while (($nrow = oci_fetch_array($stid1, OCI_ASSOC)) != false) {	
	$ID_MAIN=$nrow['ID_MAIN'];
	$ID_SLUZH=$nrow['ID_SLUZH'];	
    }

$stid2 = oci_parse($conn,"SELECT NAME_ORG FROM DOROGA_ORG WHERE INDEX_ORG = :ID_ORG");
oci_bind_by_name($stid2, ":ID_ORG",  $mas[0]['ID_ORG']);
oci_execute($stid2);

while (($nrow2 = oci_fetch_array($stid2, OCI_ASSOC)) != false) {
	$NAME_ORG=$nrow2['NAME_ORG'];   
	}

$stid3 = oci_parse($conn,"SELECT NAME_ORG FROM DOROGA_ORG WHERE ID = :ID_SLUZH");
oci_bind_by_name($stid3, ":ID_SLUZH",  $ID_SLUZH);
oci_execute($stid3);

while (($nrow3 = oci_fetch_array($stid3, OCI_ASSOC)) != false) {
	$NAME_SLUZH=$nrow3['NAME_ORG'];
   	}

$stid = oci_parse($conn, "ALTER SESSION SET NLS_DATE_FORMAT = 'dd.MM.yyyy'");
oci_execute($stid);

$success = "success";

$stid = oci_parse($conn,"INSERT INTO MI_LIST (ID, ID_ORG, ID_NOD, NAME_ORG, NAME_SLUZH, NUM_PP, NAME, AUTORS, ID_NOMINAC, ZNACHIM, DATE_REG) VALUES (id_mi_list.NEXTVAL, :ID_ORG, :ID_NOD, :NAME_ORG, :NAME_SLUZH, :NUM_PP, :NAME, :AUTORS, :ID_NOMINAC, :ZNACHIM, :DATE_REG)");

oci_bind_by_name($stid, ":ID_ORG",  $mas[0]['ID_ORG']);
oci_bind_by_name($stid, ":ID_NOD",  $ID_MAIN);
oci_bind_by_name($stid, ":NAME_ORG",  $NAME_ORG);
oci_bind_by_name($stid, ":NAME_SLUZH",  $NAME_SLUZH);
oci_bind_by_name($stid, ":NUM_PP",  $mas[0]['NUM_PP']);
oci_bind_by_name($stid, ":DATE_REG",  $mas[0]['DATE_REG']);
oci_bind_by_name($stid, ":NAME",  $mas[0]['NAME']);
oci_bind_by_name($stid, ":AUTORS",  $mas[0]['AUTORS']);
oci_bind_by_name($stid, ":ID_NOMINAC",  $mas[0]['ID_NOMINAC']);
oci_bind_by_name($stid, ":ZNACHIM",  $mas[0]['ZNACHIM']);


oci_execute($stid);


echo json_encode ($success);
	
oci_free_statement($stid);
oci_free_statement($stid1);
oci_free_statement($stid2);
oci_free_statement($stid3);
oci_close($conn);
?>