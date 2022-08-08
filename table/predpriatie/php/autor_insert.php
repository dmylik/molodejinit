<?php

$conn = oci_connect('OTPEB', 'QweAsdZxc1', '(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(HOST = 10.3.0.54)(PORT = 1521)) )(CONNECT_DATA = (SERVICE_NAME = bivc.brest.rw)))', "AL32UTF8");


//меняем формат выводимых данных
$stid = oci_parse($conn, "ALTER SESSION SET NLS_DATE_FORMAT = 'DD.MM.YYYY'");
oci_execute($stid);

$fam = $_GET['fam'];
$name = $_GET['name'];
$otch = $_GET['otch'];


	if ($otch != "1") {

	$stid = oci_parse($conn,"SELECT personal.tabnom, personal.tabf, personal.tabn, personal.tabo, personal.gbdat, personal.address, personal.telnd, case when  doroga_org.cod_org  is null then to_char(' ') else to_char(doroga_org.cod_org) end as cod_org, ps.named
	FROM PERSONAL
	left JOIN doroga_org ON doroga_org.index_org=personal.index_org
	left JOIN pers_pris ps on ps.tabnom=personal.tabnom 
	where lower(personal.tabf)=:fam and lower(personal.tabn)=:name and lower(personal.tabo)=:otch
	and personal.daty is null
	and ps.datn in (select max(pers_pris.datn) from pers_pris where pers_pris.tabnom = personal.tabnom)");
	oci_bind_by_name($stid, ":fam", $fam);
	oci_bind_by_name($stid, ":name", $name);
	oci_bind_by_name($stid, ":otch", $otch);
	oci_execute($stid);

	$data_fio = array ();
	$i = 0;
	while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
		
		$tab_num = $row['TABNOM'];
		$fam = $row['TABF'];
		$name =  $row ['TABN'];
		$otch =  $row ['TABO'];
		$birthday =  $row ['GBDAT'];
		$adress =  $row ['ADDRESS'];
		$tel_nubm =  $row ['TELND'];
		$work_place =  $row ['COD_ORG'];
		$dolzhn =  $row ['NAMED'];
		
		
							$arr = array("tab_num"  => $tab_num, 
							"fam"  => $fam,
							"name"  => $name,
							"otch"  => $otch,
							"birthday"  => $birthday,
							"adress"  => $adress,
							"tel_nubm"  => $tel_nubm,
							"work_place"  => $work_place,
							"dolzhn"  => $dolzhn,
											);
							
							$mas= [];
					
					$data_fio[$i] = $arr;
					$i= $i+1;
			
					}
					$i = 0;
					echo json_encode ($data_fio);
	}
	
		else {
			
			
			if ($name != "1") {
				
						
				$stid = oci_parse($conn,"SELECT personal.tabnom, personal.tabf, personal.tabn, personal.tabo, personal.gbdat, personal.address, personal.telnd, case when  doroga_org.cod_org  is null then to_char(' ') else to_char(doroga_org.cod_org) end as cod_org, ps.named
				FROM PERSONAL
				left JOIN doroga_org ON doroga_org.index_org=personal.index_org
				left JOIN pers_pris ps on ps.tabnom=personal.tabnom 
				where lower(personal.tabf)=:fam and lower(personal.tabn)=:name
				and personal.daty is null
				and ps.datn in (select max(pers_pris.datn) from pers_pris where pers_pris.tabnom = personal.tabnom)");
				oci_bind_by_name($stid, ":fam", $fam);
				oci_bind_by_name($stid, ":name", $name);
				oci_execute($stid);

				$data_fio = array ();
				$i = 0;
				while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
					
					$tab_num = $row['TABNOM'];
					$fam = $row['TABF'];
					$name =  $row ['TABN'];
					$otch =  $row ['TABO'];
					$birthday =  $row ['GBDAT'];
					$adress =  $row ['ADDRESS'];
					$tel_nubm =  $row ['TELND'];
					$work_place =  $row ['COD_ORG'];
					$dolzhn =  $row ['NAMED'];
					
					$arr = array("tab_num"  => $tab_num, 
							"fam"  => $fam,
							"name"  => $name,
							"otch"  => $otch,
							"birthday"  => $birthday,
							"adress"  => $adress,
							"tel_nubm"  => $tel_nubm,
							"work_place"  => $work_place,
							"dolzhn"  => $dolzhn,
				);
							
							$mas= [];
					
					$data_fio[$i] = $arr;
					$i= $i+1;
			
					}
					$i = 0;
					
				echo json_encode ($data_fio);
						
			}
			
			else
					{    if ($fam != "1") {
							$stid = oci_parse($conn,"SELECT personal.tabnom, personal.tabf, personal.tabn, personal.tabo, personal.gbdat, personal.address, personal.telnd, case when  doroga_org.cod_org  is null then to_char(' ') else to_char(doroga_org.cod_org) end as cod_org, ps.named
							FROM PERSONAL
							left JOIN doroga_org ON doroga_org.index_org=personal.index_org
							left JOIN pers_pris ps on ps.tabnom=personal.tabnom 
							where lower(personal.tabf)=:fam
							and personal.daty is null
							and ps.datn in (select max(pers_pris.datn) from pers_pris where pers_pris.tabnom = personal.tabnom)");
							oci_bind_by_name($stid, ":fam", $fam);
							oci_execute($stid);

						$data_fio = array ();
						$i = 0;
						while (($row = oci_fetch_array($stid, OCI_ASSOC)) != false) {
							
							$tab_num = $row['TABNOM'];
							$fam = $row['TABF'];
							$name =  $row ['TABN'];
							$otch =  $row ['TABO'];
							$birthday =  $row ['GBDAT'];
							$adress =  $row ['ADDRESS'];
							$tel_nubm =  $row ['TELND'];
							$work_place =  $row ['COD_ORG'];
							$dolzhn =  $row ['NAMED'];
					
							$arr = array("tab_num"  => $tab_num, 
									"fam"  => $fam,
									"name"  => $name,
									"otch"  => $otch,
									"birthday"  => $birthday,
									"adress"  => $adress,
									"tel_nubm"  => $tel_nubm,
									"work_place"  => $work_place,
									"dolzhn"  => $dolzhn,
									);
									
									$mas= [];
							
							$data_fio[$i] = $arr;
							$i= $i+1;
						
						}
				$i = 0;
			
				echo json_encode ($data_fio);
					}
			}
		}

oci_free_statement($stid);
oci_close($conn);
?>
