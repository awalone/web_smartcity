<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $usr = $_POST['user'];
    $pwd = $_POST['pass'];
    $ktp = $_POST['ktp'];
    require_once('dbConnect.php');


        if ( (!empty($pwd)) ||  (!empty($usr)) ){

            if (!empty($pwd)){
               $sql = "UPDATE akun SET kata_sandi='$pwd' WHERE id_akun= '$ktp'";
            } 
            if (!empty($usr)){
              $sql = "UPDATE akun SET username='$usr' WHERE id_akun= '$ktp'";
            }
            if ((!empty($pwd)) && (!empty($usr))){
                $sql = "UPDATE akun SET username='$usr', kata_sandi='$pwd' WHERE id_akun= '$ktp'";
            }
            
             if(mysqli_query($con,$sql)){
		echo "Berhasil memperbarui akun";
              }else{
 		echo "Gagal memperbarui akun";
	      }            
        } else {
        echo "Tidak ada perubahan";
       }

} else {
    echo "Tidak dapat terhubung ke server";
}
?>
