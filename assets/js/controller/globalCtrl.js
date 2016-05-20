/**
 * Created by Fadhli on 11/18/2015.
 */
myApp.controller('globalCtrl',function($scope,$location){
    $scope.global = {};
    $scope.global.navUrl = 'public/view/templates/header.html';
    $scope.global.footerUrl = 'public/view/templates/footer.html';
});
