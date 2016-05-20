myApp.controller('daftarCtrl',function($scope,$location,$http,userModel){
    $scope.data = {};
    $scope.data.jk = 'laki-laki';
    $scope.submitForm = function(valid){
        if (valid){
            var data = $scope.data;
            $http.post('public/models/register.php',{data:data})
                .then(function(res){
                    var data = {
                        username : res.data.username,
                        password : res.data.password
                    };
                    userModel.doLogin(data);
                    console.log(res)
                },function(res){
                    console.log(res);
                })
        }
    }
});