<?php

header('Content-Type: application/json');
$obj=$_POST['arguments'];
$mas = json_decode($obj,JSON_UNESCAPED_UNICODE);

 include '../../../db.php';

$conn = oci_connect($scema, $password , $bd, 'AL32UTF8');
$stid = oci_parse($conn, "ALTER SESSION SET NLS_DATE_FORMAT = 'DD.MM.YYYY'");
oci_execute($stid);



$stid = oci_parse($conn,"select ID, DATE_REG, NAME, AUTORS, ID_NOMINAC, ZNACHIM, ID_FILE from MI_LIST WHERE id_org = :id_org order by DATE_REG DESC");

oci_bind_by_name($stid, ":id_org", $mas[0]['id_org']);

oci_execute($stid);

$data = array ();
$i = 0; 

while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
    
	$ID = $row['ID'];
	$DATE_REG = $row['DATE_REG'];
	$NAME =  $row['NAME'];    
	$AUTORS =  $row['AUTORS'];
	$ID_NOMINAC =  $row['ID_NOMINAC'];
	$ZNACHIM =  $row['ZNACHIM'];
	$ID_FILE =  $row['ID_FILE'];
		
	$arr = array("ID"  => $ID,
                "DATE_REG"  => $DATE_REG,
                "NAME"  => $NAME,
                "AUTORS"  => $AUTORS,
                "ID_NOMINAC"  => $ID_NOMINAC,
                "ZNACHIM"  => $ZNACHIM,
                "ID_FILE"  => $ID_FILE,
			);
			
	$data[$i] = $arr;
    $i= $i+1;
	}

$i = 0;
echo json_encode ($data);

oci_free_statement($stid);
oci_close($conn);
?>