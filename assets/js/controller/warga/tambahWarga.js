/**
 * Created by Virah on 11/19/2015.
 */
myApp.controller('tambahWargaCtrl',function($scope,$http,$location,$timeout){
    $scope.user = {};
    $scope.user.jk = 'laki-laki';
    $scope.error_message = '';
    $scope.tambahWarga = function(valid){
        if (valid){
            var user = $scope.user;
            $http.post('public/models/warga/postTambahWarga.php',{user:user})
                .then(function(){
                    $location.path('/daengsampah/daftar-warga');
                },function(response){
                    if (response.status = '403'){
                        $scope.error_message = 'Nomor KTP yg diinput sudah ada dlm data base';
                    } else {
                        $scope.error_message = 'Terjadi kesalahan!!';
                    }
                    $timeout(function () { $scope.error_message = ''; }, 3000);
                    $scope.user = '';
                    console.log(response)
                })
        }
    }
});
