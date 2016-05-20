/**
 * Created by Fadhli on 11/18/2015.
 */
myApp.controller('navCtrl',function($rootScope,$scope,$location,$cookies,userModel){
    $scope.userStatus = $cookies.get('auth');
    $scope.userView = $cookies.get('nama');
    console.log($scope.userStatus);
    $scope.link=[{
        'link':'Beranda',
        'url':'/daengsampah/beranda',
        'user': 'global'
    },{
        'link':'Data Laporan Masuk',
        'url':'/daengsampah/daftar-laporan',
        'user' : 'global'
    },{
        'link':'Data Petugas',
        'url':'/daengsampah/daftar-petugas',
        'user' : 'admin'
    },{
        'link':'Data laporan Masuk',
        'url':'/daengsampah/daftar-laporan-petugas',
        'user' : 'petugas'
    },{
        'link':'Data Warga',
        'url':'/daengsampah/daftar-warga',
        'user' : 'admin'
    },{
        'link':'Pengaturan Akun',
        'url':'/daengsampah/pengaturan-akun-admin',
        'user' : 'petugas'
    },{
        'link':'Pengaturan Akun',
        'url':'/daengsampah/pengaturan-akun-warga',
        'user' : 'warga'
    }];
    $scope.isActive = function(destination){
        return destination === $location.url();
    };
    $scope.doLogout = function(){
        userModel.doLogout();
        $location.path('/')
    };
    $rootScope.$on("$stateChangeStart",function (event, toState, toParams, fromState, fromParams){
        $scope.userStatus = $cookies.get('auth');
        $scope.userView = $cookies.get('nama');
        console.log($scope.userStatus);
    });
});