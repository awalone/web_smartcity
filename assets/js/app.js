/**
 * Created by virah on 17-Nov-15.
 */

var myApp = angular.module('myApp',['ui.router','ui.bootstrap','ngAnimate','ngCookies','ngRoute']);

myApp.config(function($stateProvider,$urlRouterProvider){
   $stateProvider
       .state('login',{
           url:'/',
           templateUrl:'public/view/login.html',
           controller:'loginCtrl',
           data: {
               requireLogin: false
           }
       })
       .state('site',{
           url:'/daengsampah',
           templateUrl:'public/view/site.html',
           controller:'siteCtrl',
           data: {
               requireLogin: false
           }
       })
               .state('site.daftar',{
                   url:'/daftar',
                   templateUrl:'public/view/register.html',
                   controller:'daftarCtrl',
                   data: {
                       requireLogin: false
                   }
               })
               .state('site.beranda',{
                   url:'/beranda',
                   templateUrl:'public/view/beranda.html',
                   controller:'berandaCtrl',
                   data: {
                       requireLogin: true
                   }
               })
               .state('site.pengaturan-akun-warga',{
                   url:'/pengaturan-akun-warga',
                   templateUrl:'public/view/pengaturan/pengaturan_akun_warga.html',
                   controller:'pengaturanAkunWargaCtrl',
                   data: {
                       requireLogin: true
                   }
               })
               .state('site.laporan',{
                   url:'/daftar-laporan',
                   templateUrl: 'public/view/laporan/daftar_laporan.html',
                   controller:'daftarLaporanCtrl',
                   data: {
                       requireLogin: true
                   }
               })
               .state('site.pengaturan-akun-admin',{
                   url:'/pengaturan-akun-admin',
                   templateUrl: 'public/view/pengaturan/pengaturan_akun_admin.html',
                   controller:'pengaturanAkunAdminCtrl',
                   data: {
                       requireLogin: true
                   }
               })
               .state('site.petugas',{
                   url:'/daftar-petugas',
                   templateUrl: 'public/view/petugas/daftar_petugas.html',
                   controller:'daftarPetugasCtrl',
                   data: {
                       requireLogin: true
                   }
               })
                       .state('site.petugas.edit',{
                           url:'/edit/:id',
                           templateUrl: 'public/view/petugas/edit_petugas.html',
                           controller:'editPetugasCtrl',
                           data: {
                               requireLogin: true
                           }
                       })
                       .state('site.petugas.tambah-petugas',{
                           url:'/tambah-petugas',
                           templateUrl: 'public/view/petugas/tambah_petugas.html',
                           controller:'tambahPetugasCtrl',
                           data: {
                               requireLogin: true
                           }
                       })
               .state('site.warga',{
                   url:'/daftar-warga',
                   templateUrl: 'public/view/warga/daftar_warga.html',
                   controller:'daftarWargaCtrl',
                   data: {
                       requireLogin: true
                   }
               })
                       .state('site.warga.edit',{
                           url:'/edit/:id',
                           templateUrl: 'public/view/warga/edit_warga.html',
                           controller:'editWargaCtrl',
                           data: {
                               requireLogin: true
                           }
                       })
                       .state('site.warga.tambah-warga',{
                           url:'/tambah-warga',
                           templateUrl: 'public/view/warga/tambah_warga.html',
                           controller:'tambahWargaCtrl',
                           data: {
                               requireLogin: true
                           }
                       })
               .state('site.daftar_laporan_petugas',{
                   url: '/daftar_laporan_petugas',
                   templateUrl: 'public/view/laporan/daftar_laporan_petugas.html',
                   controller: 'daftarLaporanPetugasCtrl',
                   data: {
                       requireLogin: true
                   }
               });
    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode({enabled:true,requireBase:true});
})
    .filter('startFrom', function() {
        return function(data, start) {
            if (!data || !data.length) { return; }
            start = 0 + start; //parse to int
            return data.slice(start);
        }
    });

myApp.run(['$rootScope','$location','userModel',function($rootScope,$location,userModel){
    $rootScope.$on("$stateChangeStart",function (event, toState, toParams, fromState, fromParams){
        var requireLogin = toState.data.requireLogin;
        if (requireLogin){
            if (!userModel.getAuthStatus()){
                event.preventDefault()
                $location.path('/');
            }
        }
        if (toState.url == '/'){
            if (userModel.getAuthStatus()){
                event.preventDefault();
                $location.path(fromState.url);
            }
        }
    });
}]);