function agregarMarcador(map,location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function initMap(idMapa) {
    var baseLatLng = { lat: 9.934739, lng: -84.087502 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: baseLatLng
    });
    google.maps.event.addListener(map, 'click', function (event) {
        agregarMarcador(map, event.latLng);
    });
}

function agregarParada(mapa,nombreParada, latitud, longitud) {
    var marker = new google.maps.Marker({
        position: { lat: latitud, lng: longitud },
        map: mapa,
        title: nombreParada
    });
}