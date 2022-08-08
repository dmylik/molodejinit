<?php

header('Content-Type: application/json');
$obj=$_POST['arguments'];
$mas = json_decode($obj,JSON_UNESCAPED_UNICODE);

include '../../../db.php';

$conn = oci_connect($scema, $password , $bd, 'AL32UTF8');
$stid = oci_parse($conn, "ALTER SESSION SET NLS_DATE_FORMAT = 'DD.MM.YYYY'");
oci_execute($stid);

$stid = oci_parse($conn,"select ID, NAME, NAME_ORG, NAME_SLUZH, AUTORS, ID_NOMINAC, ZNACHIM, ID_STRUC, ID_FILE, case when  VNEDR_D is null then to_char(' ') else to_char(VNEDR_D) end as VNEDR_D, VNEDR_M, VYBOR_NOD  FROM MI_LIST WHERE ID_NOD = :id_nod");



oci_bind_by_name($stid, ":id_nod", $mas[0]['id_nod']);

oci_execute($stid);

$data = array ();
$i = 0; 

while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
    
	$ID = $row['ID'];
	$NAME = $row['NAME'];
	$NAME_ORG = $row['NAME_ORG'];
	$NAME_SLUZH = $row['NAME_SLUZH'];
	$AUTORS = $row['AUTORS'];
	$ID_NOMINAC = $row['ID_NOMINAC'];
	$ZNACHIM = $row['ZNACHIM'];
    $ID_STRUC = $row['ID_STRUC'];
	$ID_FILE = $row['ID_FILE'];
    $VNEDR_D = $row['VNEDR_D'];
    $VNEDR_M = $row['VNEDR_M'];
    $VYBOR_NOD = $row['VYBOR_NOD'];

	$arr = array("ID"  => $ID,
                "NAME"  => $NAME,
                "NAME_ORG"  => $NAME_ORG,
                "NAME_SLUZH"  => $NAME_SLUZH,
                "AUTORS"  => $AUTORS,
                "ID_NOMINAC"  => $ID_NOMINAC,
                "ZNACHIM"  => $ZNACHIM,
                "ID_STRUC"  => $ID_STRUC,
                "ID_FILE"  => $ID_FILE,
                "VNEDR_D"  => $VNEDR_D,
                "VNEDR_M"  => $VNEDR_M,
                "VYBOR_NOD"  => $VYBOR_NOD,
			);
			
	$data[$i] = $arr;
    $i= $i+1;
	}

$i = 0;

echo json_encode ($data);

oci_free_statement($stid);
oci_close($conn);
?>