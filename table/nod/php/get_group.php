<?php

include '../../../db.php';

$conn = oci_connect($scema, $password , $bd, 'AL32UTF8');

$id_main = $_GET['value'];


$stid = oci_parse($conn,"select name_org, id from doroga_org where id_main = :id_main order by id");
oci_bind_by_name($stid, ":id_main", $id_main);
oci_execute($stid);

$data = array ();
$i = 0;

while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
	
	$name_org = $row['NAME_ORG'];
	$index_org = $row['ID'];
	
	$arr = array("name_org"  => $name_org, 
		     "index_org"  => $index_org,
			);
			
	$data[$i] = $arr;
	$i= $i+1;
	}
	$i = 0;
echo json_encode ($data);	

oci_free_statement($stid);
oci_close($conn);
?>