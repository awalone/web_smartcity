/**
 * Created by Virah on 11/19/2015.
 */
myApp.controller('editWargaCtrl',function($scope,$http,$location,$stateParams){
    var ktp = $stateParams.id;
    $scope.user = {};
    $scope.editData = {};
    $http.post('public/models/warga/getEditWarga.php',{ktp:ktp})
        .then(function(response){
            $scope.user = response.data;
            $scope.user.jk = response.data.jenis_kelamin;
        }, function(response){
            console.log(response);
        });
    $scope.editWarga = function(valid){
        if (valid){
            var user = $scope.user;
            $http.post('public/models/warga/postEditWarga.php',{user: user})
                .then(function(){
                    $location.path('/daengsampah/daftar-warga');
                },function(response){
                    console.log(response)
                })
        }
    }
});
