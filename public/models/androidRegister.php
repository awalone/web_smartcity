<?php
 
 if($_SERVER['REQUEST_METHOD']=='POST'){
 
 $ktp = $_POST['ktp'];
 $email = $_POST['email'];
 $nama = $_POST['nama'];
 $jk = $_POST['jk'];
 $alamat= $_POST['alamat'];
 $telepon = $_POST['telepon'];
 $password = $_POST['password'];


 require_once('dbConnect.php');

 $res = mysqli_query($con,$sql);

 $sql = "INSERT INTO user SET ktp = '$ktp', email = '$email', nama = '$nama', jenis_kelamin = '$jk', alamat = '$alamat', no_telp = '$telepon', status = 'warga'";

 if(mysqli_query($con,$sql)){
  $res = mysqli_query($con,$sql2);
  $sql2 = "INSERT INTO akun SET id_akun = '$ktp', username = '$ktp', nama = '$nama', kata_sandi = '$password'";
  if (mysqli_query($con,$sql2)){
   echo "Berhasil membuat akun";
  }
 }else{
 echo "Gagal mengirim data ke server";
 }
 
 mysqli_close($con);
 }else{
 echo "Tidak dapat terhubung ke server";
 }

?>
