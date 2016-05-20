myApp.controller('loginCtrl',function($scope,$log,$http,$location,userModel){
    $scope.login={};
    $scope.doLogin = function(){
        var data = {
            username : $scope.login.username,
            password : $scope.login.password
        };
        userModel.doLogin(data);
    }
});