<?php

include '../../../db.php';

$conn = oci_connect($scema, $password , $bd, 'AL32UTF8');

$name_org = $_GET['value'];

$stid1 = oci_parse($conn,"select name_org, id from doroga_org where NAME_ORG = :name_org order by index_org");
oci_bind_by_name($stid1, ":name_org", $name_org);
oci_execute($stid1);

while (($row1 = oci_fetch_array($stid1, OCI_ASSOC)) != false) {
	
	$id_main = $row1['ID'];	
}


if ( $id_main > 35) {
$stid = oci_parse($conn,"select name_org, index_org from doroga_org where id_main = :id_main order by index_org");
oci_bind_by_name($stid, ":id_main", $id_main);
oci_execute($stid);

$data = array ();
$i = 0;

while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
	
	$name_org = $row['NAME_ORG'];
	$index_org = $row['INDEX_ORG'];
	
	$arr = array("name_org"  => $name_org, 
				 "index_org"  => $index_org,
			);
	$data[$i] = $arr;
	$i= $i+1;
	}
	$i = 0;	
}
else {
$stid = oci_parse($conn,"select name_org, index_org from doroga_org where id_sluzh = :id_main order by index_org");
oci_bind_by_name($stid, ":id_main", $id_main);
oci_execute($stid);

$data = array ();
$i = 0;

while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
	
	$name_org = $row['NAME_ORG'];
	$index_org = $row['INDEX_ORG'];
	$arr = array("name_org"  => $name_org, 
				 "index_org"  => $index_org,
			);
			
	$data[$i] = $arr;
	$i= $i+1;
	}
	$i = 0;	
	
}
echo json_encode ($data);	
oci_free_statement($stid);
oci_free_statement($stid1);
oci_close($conn);
?>