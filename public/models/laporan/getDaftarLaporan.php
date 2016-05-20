<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/20/2015
 * Time: 9:01 PM
 */
include "../connection.php";

$db = Database::getInstance();
$mysqli = $db->getConnection();
error_reporting(0);
/*
 * get data from $http.post request
 *
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$data = $request->data;
*/
$sql_query = "SELECT k.*, k.status AS status_keluhan ,u.* FROM keluhan AS k, user AS u WHERE k.ktp_user = u.ktp";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
    while ($row = mysqli_fetch_array($result)){
        if ($row['ktp_petugas']==''){
            $sql_query_petugas="SELECT * FROM user WHERE status = 'petugas'";
            $result_petugas=$mysqli->query($sql_query_petugas);
            while ($petugas = mysqli_fetch_array($result_petugas)){
                $row['petugas'][] = $petugas;
                $row['nama_petugas'] = '';
            }
        } else {
            $sql_query_petugas2="SELECT nama FROM user WHERE status = 'petugas' AND ktp = '$row[ktp_petugas]'";
            $result_petugas2=$mysqli->query($sql_query_petugas2);
            while ($petugas2 = mysqli_fetch_array($result_petugas2)){
                $row['nama_petugas'] = $petugas2;
                $row['petugas'] = '';
            }
        }
        $data[] = $row;
    }
    echo ")]}',\n";
    echo json_encode($data);
}

