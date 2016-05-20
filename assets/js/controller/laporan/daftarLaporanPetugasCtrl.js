/**
 * Created by Fadhli on 11/19/2015.
 */
myApp.controller('daftarLaporanPetugasCtrl',function($scope,$http,$filter,$cookies){
    $scope.ktp=$cookies.get('id_akun');;
    var id = $cookies.get('id_akun');
    $http.post('public/models/laporan/getDaftarLaporanPetugas.php',{id_akun : id})
        .then(function(response){
        console.log('success');
        $scope.laporan = response.data;
    }, function(response){
        console.log(response);
    });
    $scope.updateStatus = function(id){
        $http.post('public/models/laporan/updateStatusLaporan.php',{id_keluhan:id})
            .then(function(response){
                var id = $cookies.get('id_akun');
                $http.post('public/models/laporan/getDaftarLaporanPetugas.php',{id_akun : id})
                    .then(function(response){
                        console.log('success');
                        $scope.laporan = response.data;
                    }, function(response){
                        console.log(response);
                    });
        }, function(response){
            console.log(response)
        })
    };
    /*UI Bootstrap Date*/
    $scope.dt ={};
    $scope.today = function() {
        //$scope.dt.waktu = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt.waktu = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function($event) {

        $scope.status.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','yyyy-MM-dd'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

    /* Watch dt.waktu if change*/
    $scope.$watch('dt.waktu', function (newValue,oldValue){
        if (newValue !== oldValue){
            var dateView = $filter('date')(newValue,'yyyy-MM-dd');
            //variabel filter waktu pencarian
            $scope.dt.Fwaktu = dateView;
        }
    });
    $scope.pageSize=5;
    $scope.currentPage=1;
    $scope.reverse = false;
    $scope.orderBy = function(predicateName) {
        if (predicateName == $scope.predicate) {
            $scope.reverse = !$scope.reverse
        } else {
            $scope.predicate = predicateName;
            $scope.reverse = false;
        }
    };
});
