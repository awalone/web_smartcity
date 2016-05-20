/**
 * Created by Virah on 11/19/2015.
 */
myApp.controller('pengaturanAkunAdminCtrl',function($scope,$http,$location,$cookies){
    var ktp = $cookies.get('id_akun');
    $scope.petugas = {};
    $scope.success = '';
    $http.post('public/models/pengaturan/pengaturanAkunAdmin.php',{ktp:ktp})
        .then(function(response){
            $scope.petugas = response.data;
            console.log(response.data);
        }, function(response){
            console.log(response);
        });
    $scope.submitForm = function(valid){
        if ((valid) && ($scope.success != '1')){
            var id_akun = $scope.petugas.id_akun;
            var username = $scope.petugas.username;
            var kata_sandi = $scope.petugas.kata_sandi;
            $http.post('public/models/pengaturan/postEditAdmin.php',{id_akun: id_akun, username:username, kata_sandi: kata_sandi})
                .then(function(response){
                    $scope.success = '1';
                    console.log(response)
                },function(response){
                    console.log(response)
                })
        }
    }
    /* Watch dt.waktu if change*/
    $scope.$watch('petugas.username', function (newValue,oldValue){
        if (newValue !== oldValue){
            $scope.success = '';
        }
    });
    $scope.$watch('petugas.kata_sandi', function (newValue,oldValue){
        if (newValue !== oldValue){
            $scope.success = '';
        }
    });

});
