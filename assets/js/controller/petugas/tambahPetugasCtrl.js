/**
 * Created by Virah on 11/19/2015.
 */
myApp.controller('tambahPetugasCtrl',function($scope,$http,$location,$timeout){
    $scope.user = {};
    $scope.error_message = '';
    $scope.tambahPetugas = function(valid){
        if (valid){
            var user = $scope.user;
            $http.post('public/models/petugas/postTambahPetugas.php',{user:user})
                .then(function(){
                    $location.path('/daengsampah/daftar-petugas');
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
