myApp.controller('mapCtrl',function($scope,$log,$http){
    var keluhan = [];
    //fungsi ajax untuk mendapatkan keluhan
    $http.get('public/models/map/getKeluhan.php')
        .then(function(response){
            keluhan = response.data;
            //create marker
            for (i = 0; i < keluhan.length; i++) {
                createMarker(keluhan[i]);
            }
            console.log(keluhan);
        },function(response){
            console.log(response);
        });
    /*Map*/
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(-5.1333333, 119.4166667),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info) {

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.nama
        });
        //marker.data = {};
        //marker.data = info;
        marker.content = '' +
            '<div class="infoWindowContent">' +
            '   <h4>' + marker.title + '</h4>  ' +
            '   <img src="assets/img/'+info.gambar+'" style="width: 200px;" class="img-custom" alt="'+info.gambar+'">' +
            '   <p><i class="fa fa-map-marker"></i> Lokasi :' + info.latitude +' ,'+ info.longitude + '</p>' +
            '   <p><i class="fa fa-clock-o"></i> Waktu :'+info.waktu+'</p>' +
            '   <p><i class="fa fa-pencil-square-o"></i>Keluhan :'+info.keluhan+'</p>' +
            '</div>';
        google.maps.event.addListener(marker, 'click', function () {
            /*open map default content*/
            infoWindow.setContent(marker.content);
            infoWindow.open($scope.map, marker);

            /*
             * open data inside a modal
             *
             *
             $scope.dataModal = marker.data;
             $('#detail').modal();
             */
        });

        $scope.markers.push(marker);

    };

    $scope.openInfoWindow = function (e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    };
});