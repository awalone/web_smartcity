/**
 * Created by Fadhli on 11/25/2015.
 */
myApp.factory('userModel', function ($http,$location,$cookies,$log) {
    var userModel = {};
    var statusUser;
    userModel.doLogin = function (loginForm) {
        return $http.post('public/models/login.php', {username: loginForm.username, password: loginForm.password})
            .then(function (response) {
                console.log(response);
                if (response.data.status_login == '0') {
                    alert(response.data.message);
                }
                if (response.data.status_login == '1') {
                    statusUser = response.data.status_user;
                    $location.path('/daengsampah/beranda');
                    $cookies.put('auth',response.data.status_user);
                    $cookies.put('id_akun',response.data.id);
                    $cookies.put('nama',response.data.nama)
                }
            }, function (response) {
                $log.info(response);
            })
    };
    userModel.doLogout = function(){
        $cookies.remove('auth');
        $cookies.remove('id_akun');
        $cookies.remove('nama');
    }
    userModel.getAuthStatus = function(){
        var status = $cookies.get('auth');
        if (status){
            return true;
        } else {
            return false;
        }
    };
    return userModel;
});