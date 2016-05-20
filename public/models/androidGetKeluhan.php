<?php

$link = mysql_connect("localhost", "awalone", "sur!4lambintiumar") or die('Cannot connect to the DB');
mysql_select_db('awalone_thesis', $link) or die('Cannot select the DB');

$query= "SELECT k.id_keluhan,k.keluhan,k.latitude,k.longitude,k.gambar,k.waktu,u.nama,u.alamat FROM keluhan AS k, user AS u WHERE u.ktp = k.ktp_user order by k.id_keluhan desc";
//$query_jawaban= "SELECT * FROM jawaban";

$hasil= mysql_query($query, $link) or die('Errorquery:  '.$query);

$response = array();
$response["keluhan"] = array();
$url="http://daengsampah.com/assets/img/";
if (mysql_num_rows($hasil) > 0) {
    while ($data = mysql_fetch_array($hasil))
    {
        $h['id_keluhan']       = $data['id_keluhan'] ;
        $h['keluhan']          = $data['keluhan'] ;
        $h['latitude']         = $data['latitude'] ;
        $h['longitude']        = $data['longitude'] ;
        $h['gambar']           = $url.$data['gambar'];
        $h['waktu']            = $data['waktu'] ;
        $h['nama']             = $data['nama'];
        $h['alamat']           = $data['alamat'];

        array_push($response["keluhan"], $h);
    }

   // $response["success"] = "1";
    echo json_encode($response);

} else {
    $response["success"] = "0";
    $response["message"] = "Tidak Ada Data";
    echo json_encode($response);
}

?>