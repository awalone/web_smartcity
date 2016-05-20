<?php
 
 if($_SERVER['REQUEST_METHOD']=='POST'){
 
 $image = $_POST['image'];
 $ktp = $_POST['ktp'];
 $lat = $_POST['latitude'];
 $lon = $_POST['longitude'];
 $wak = $_POST['waktu'];
 $alamat= $_POST['alamat'];
 $kel = $_POST['keluhan'];
 $ng = $_POST['namagambar'];


 require_once('dbConnect.php');
 

 
 $res = mysqli_query($con,$sql);
 

 $namafoto = $ng;
 $path = "../../assets/img/$namafoto";
 
 $actualpath = "ukietux.ngrok/sampahta/public/$path";
 

 $sql = "INSERT INTO keluhan (id_keluhan,ktp_user,ktp_petugas,gambar,latitude,longitude,waktu,waktu_selesai,keluhan,status) 
         VALUES ('',
           '$ktp',
           '',
           '$namafoto',
           '$lat',
           '$lon',
           '$wak',
           '$alamat',
           '$kel',
           'menunggu')";
 
 if(mysqli_query($con,$sql)){
 file_put_contents($path,base64_decode($image));
 echo "Berhasil mengirim data ke server";
 }else{
 echo "Gagal mengirim data ke server";
 }
 
 mysqli_close($con);
 }else{
 echo "Tidak dapat terhubung ke server";
 }

?>
