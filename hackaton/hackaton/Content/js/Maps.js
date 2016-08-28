var currentMarker;
var geocoder;
var infowindow;
var map;
var mapParadas;
var edit = true;

var colors = ["red", "yellow", "green", "blue", "orange"];

function initMap() {
     currentMarker = null;
     geocoder = new google.maps.Geocoder;
     infowindow = new google.maps.InfoWindow;

    var baseLatLng = { lat: 9.934739, lng: -84.087502 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: baseLatLng
    });

    google.maps.event.addListener(map, 'click', function (event) {
        if (edit) {
            borrarMarcador();
            obtenerDireccionCoordenadas(event.latLng, infowindow);
        }
    });
}

function setEdit(value) {
    edit = value;
}

function borrarMarcador() {
    if (currentMarker) {
        currentMarker.setMap(null);
        currentMarker = [];
    }
}

function obtenerDireccionCoordenadas(location, infowindow) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    currentMarker = marker;
    geocoder.geocode({ 'location': location }, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                infowindow.setContent(results[1].formatted_address);
                infowindow.open(map, marker);
            } else {
                console.log('No se encontro direccion');
            }
        } else {
            console.log('Fallo en geolocalizacion: ' + status);
        }
    });
}

function obtenerCoordenadasDesdeDireccion(direccion) {
    geocoder.geocode({ 'address': direccion }, function (results, status) {
        if (status == 'OK') {
            borrarMarcador();
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true,
                animation: google.maps.Animation.DROP
            });
            currentMarker = marker;
        } else {
            alert('Fallo en geolocalizacion: ' + status);
        }
    });
}

function test(color) {
    var paradas = [{ lat: 9.535748998133627, lng: -83.089599609375, nombre: 'A' }, { lat: 9.635748998133627, lng: -83.089599609375, nombre: 'B' }, { lat: 9.735748998133627, lng: -83.089599609375, nombre: 'C' }]
    mostrarParadas('test', paradas, color);
}

function mostrarParadas(map, nombreRuta, arrayParadas, numColor) {
    for (var x = 0; x < arrayParadas.length; x++) {
        var marker = new google.maps.Marker({
            map: map,
            position: { lat: arrayParadas[x].lat, lng: arrayParadas[x].lng },
            title: nombreRuta,
            label: arrayParadas[x].nombre,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/' + colors[numColor] + '-dot.png');
    }
}

function initMapaParadas() {
    var baseLatLng = { lat: 9.934739, lng: -84.087502 };
    mapParadas = new google.maps.Map(document.getElementById('mapParadas'), {
        zoom: 9,
        center: baseLatLng
    });
}

function obtenerParadasLista(idLista) {
    var paradas = $('#paradasRuta li');
    var arrayParadas = [];
    for (var x = 0; x < paradas.length; x++) {
        arrayParadas.push({ lat: parseFloat(paradas[x].attr('lat')), lng: parseFloat(paradas[x].attr('lng')), nombre: paradas[x].attr('nombre') });
    }
    mostrarParadas(mapParadas,'', arrayParadas, 0);
}


