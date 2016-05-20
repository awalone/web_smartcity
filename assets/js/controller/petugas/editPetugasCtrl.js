/**
 * Created by Virah on 11/19/2015.
 */
myApp.controller('editPetugasCtrl',function($scope,$http,$location,$stateParams){
    var ktp = $stateParams.id;
    $scope.editData = {};
    $http.post('public/models/petugas/getEditPetugas.php',{ktp:ktp})
        .then(function(response){
            $scope.petugas = response.data;
        }, function(response){
            console.log(response);
        });
    $scope.editPetugas = function(valid){
        if (valid){
            var nama = $scope.petugas.nama;
            $http.post('public/models/petugas/postEditPetugas.php',{ktp:ktp, nama: nama})
                .then(function(){
                    $location.path('/daengsampah/daftar-petugas');
                },function(response){
                    console.log(response)
                })
        }
    }
});
