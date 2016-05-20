<?php
/**
 * Created by PhpStorm.
 * User: virah
 * Date: 07-Dec-15
 * Time: 3:46 PM
 */
include "connection.php";

$db = Database::getInstance();
$mysqli = $db->getConnection();
error_reporting(0);
/*
 * get data from $http.post request
 *
 */
$sql_query = "SELECT k.*, u.nama AS user, p.nama AS petugas FROM keluhan AS k, user AS u, (SELECT * FROM user WHERE status='petugas') AS p WHERE k.ktp_user = u.ktp AND k.ktp_petugas = p.ktp
";
if ($_GET['tgl'] != ''){

    $tgl = $_GET['tgl'];
    $tgl2 = date('Y-m-d',strtotime($tgl)+86400);
    $now = "TGL ".$tgl;
    $sql_query.=" AND k.waktu >= '$tgl' AND k.waktu < '$tgl2'
    ";
}
else {
    $now = '';
}
$result = $mysqli->query($sql_query);

include("../../lib/mpdf60/mpdf.php");
//mpdf/mpdf.php berarti file mpdf.php dipanggil dari dalam folder mpdf/

$html = '
    <link rel="stylesheet" href="../../lib/bootstrap/css/bootstrap.min.css">
   <div class="container">
    <div class="row text-center">
        <div class="col-sm-12">
            <h3>DATA LAPORAN MASUK PENGADUAN SAMPAH DI MAKASSAR '.$now.'</h3>
            <div class="table-responsive">
                <table class="table table-bordered text-center">
                    <thead>
                    <tr>
                        <th class="text-center">No.</th>
                        <th class="text-center">ID laporan</th>
                        <th class="text-center">Nama Pelapor</th>
                        <th class="text-center">Gambar</th>
                        <th class="text-center">Lokasi</th>
                        <th class="text-center">Waktu laporan</th>
                        <th class="text-center">Alamat</th>
                        <th class="text-center">Keluhan</th>
                        <th class="text-center">Waktu Selesai</th>
                        <th class="text-center">Petugas</th>
                    </tr>
                    </thead> ';
$no = 1;
if (mysqli_num_rows($result)>0) {
    while ($data = mysqli_fetch_array($result)) {
        $html .= '          <tbody>
                    <tr>
                        <td>' . $no . '</td>
                        <td>' . $data[id_keluhan] . '</td>
                        <td>' . $data[user] . '</td>
                        <td><img ng-src="' . $data[gambar] . '" class="img-custom" alt="gambar"></td>
                        <td>' . $data[latitude] . ',' . $data[longitude] . '</td>
                        <td>' . $data[waktu] . '</td>
                        <td>' . $data[alamat] . '</td>
                        <td>' . $data[keluhan] . '</td>
                        <td>' . $data[waktu_selesai] . '</td>
                        <td>' . $data[petugas] . '</td>
                    </tr>
                    </tbody>
';
        $no++;
    }
}
else {
    $html .= ' <tr><td class="text-center" colspan="10">Tidak Ada Data!!</td></tr>';
}
$html .='        </table>
            </div>
        </div>
    </div>
</div>
';
$mpdf = new mPDF('utf-8', 'A4-L');
//$html adalah komponen HTML yang akan dijadikan PDF
$mpdf->WriteHTML($html);
//menentukan filename tersimpan
$mpdf->Output("laporan.pdf" ,'I');
?>