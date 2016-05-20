<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/21/2015
 * Time: 4:07 PM
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
$sql_query = "SELECT k.id_keluhan,k.keluhan,k.latitude,k.longitude,k.gambar,k.waktu,k.status,u.nama,u.alamat FROM keluhan AS k, user AS u WHERE u.ktp = k.ktp_user";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
    while ($row = mysqli_fetch_array($result)){
        $data[] = $row;
    }
    echo ")]}',\n";
    echo json_encode($data);
}
