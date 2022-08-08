<?php

header('Content-Type: application/json');
$obj=$_POST['arguments'];
$mas = json_decode($obj,JSON_UNESCAPED_UNICODE);

 include '../../../db.php';

$conn = oci_connect($scema, $password , $bd, 'AL32UTF8');
$stid = oci_parse($conn, "ALTER SESSION SET NLS_DATE_FORMAT = 'DD.MM.YYYY'");
oci_execute($stid);

$year = $mas[0]['year'];
$date_start = "01.01." . $year;
$date_end = "31.12." . $year;

$stid = oci_parse($conn,"select ID, DATE_REG, NAME, AUTORS, ID_NOMINAC, ZNACHIM, ID_FILE from MI_LIST WHERE id_org = :id_org and DATE_REG BETWEEN TO_DATE (:date_start, 'DD.MM.YYYY') AND TO_DATE (:date_end, 'DD.MM.YYYY') - 1 order by DATE_REG DESC");


oci_bind_by_name($stid, ":id_org", $mas[0]['id_org']);
oci_bind_by_name($stid, ":date_start", $date_start);
oci_bind_by_name($stid, ":date_end", $date_end);

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