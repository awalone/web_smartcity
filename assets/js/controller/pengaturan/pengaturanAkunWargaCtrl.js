/**
 * Created by Virah on 11/19/2015.
 */
myApp.controller('pengaturanAkunWargaCtrl',function($rootScope,$scope,$http,$location,$cookies){
    $scope.data = {};
    var id = $cookies.get('id_akun');
    $http.post('public/models/pengaturan/pengaturanAkunAdmin.php',{id:id})
        .then(function(res){
            $scope.data = res.data;
            $scope.data.jk = res.data.jenis_kelamin;
            $scope.data.ktp = parseInt(res.data.ktp);
            $scope.data.no_telp = parseInt(res.data.no_telp);
        },function(res){
            console.log(res);
        });
    $scope.submitForm = function(){
        var data = $scope.data;
        $http.post('public/models/pengaturan/postEditWarga.php',data)
            .then(function(){
                $location.path('/daengsampah/beranda');
                console.log('update berhasil');
            },function(res){
                console.log(res);
            })
    }
});
