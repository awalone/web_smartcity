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
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$ktp = $request->ktp;

$sql_query = "SELECT a.*,u.nama FROM akun AS a, user AS u WHERE a.id_akun = '$ktp' AND u.ktp = a.id_akun AND status='petugas'";
$result = $mysqli->query($sql_query);
if (mysqli_num_rows($result)>0){
    while ($row=mysqli_fetch_array($result)){
        $data=$row;
    }
    echo json_encode($data);
}

