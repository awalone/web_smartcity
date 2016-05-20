<?php

$link = mysql_connect("localhost", "awalone", "sur!4lambintiumar") or die('Cannot connect to the DB');
mysql_select_db('awalone_thesis', $link) or die('Cannot select the DB');


//// receiving the post params
$username = $_POST['id_user'];
$password = $_POST['password'];


$login = "SELECT id_akun FROM akun WHERE  id_akun='$username' or username='$username'  and kata_sandi='$password'";

$ceklogin = mysql_query($login, $link) or die('Errorquery:  ' . $login);
$row = mysql_fetch_assoc($ceklogin);
$noktp = $row['id_akun'];

    $response = array();
    $response["login"] = array();

if (mysql_num_rows($ceklogin) > 0){


    $sql_query = "SELECT ktp,nama,status,alamat from user where ktp= '$noktp'";
    $hasil = mysql_query($sql_query, $link) or die('Errorquery:  ' . $sql_query);


    $response = array();
    $response["login"] = array();

    if (mysql_num_rows($hasil) > 0) {
        // use is found
        while ($row = mysql_fetch_array($hasil)) {
            $data['ktp'] = $row['ktp'];
            $data['nama'] = $row['nama'];
            $data['status'] = $row['status'];
            $data['alamat'] = $row['alamat'];
            array_push($response["login"], $data);
        }

        $response['success'] = '1';

        echo json_encode($response);

    } else {
        $response['success'] = '0';

        echo json_encode($response);
    }
} else {
      $response['success'] = '0';

    echo json_encode($response);
}

?>

