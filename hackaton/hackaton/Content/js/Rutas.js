

$(document).ready(function () {
    $('#agregar-ruta').click(function () {
        agregarRuta();
    });


    $('#agregar-parada').click(function () {
        agregarParada();
    });

    window.setTimeout(function () {
        initMapaParadas();
        obtenerParadasLista()
    }, 1000);
    

});




$(document).ready(function () {

    $('.abrir-mapa').click(function () {

        window.setTimeout(function () {
            google.maps.event.trigger(map, "resize");
            map.setCenter(new google.maps.LatLng(9.934739, -84.087502));
        }, 1000);
        $('.cerrar-mapa').attr('scope', $(this).data().input);
    });

    $('.buscar-mapa').click(function () {
        obtenerCoordenadasDesdeDireccion($('#ubicacion-mapa').val());
    });


    $('.cerrar-mapa').click(function (e) {
        $($(this).attr('scope')).val(currentMarker.position.lat() + "," + currentMarker.position.lng())
        $('#mapa').modal('hide');
    });

    

});


function agregarRuta() {

    var ruta = {
        nombreRuta: $('#nombre-ruta').val(),
        origenNombre: $('#origen-nombre-ruta').val(),
        destinoNombre: $('#destino-nombre-ruta').val(),
        origen: $('#origen-ruta').val(),
        destino: $('#destino-ruta').val(),
        frecuencia: $('#frecuencia-ruta').val()
    };
    var jsonRuta = JSON.stringify(ruta)
    $.ajax({
        url: "/Rutas/CreateRuta/test",
        type: 'POST',
        dataType: 'json',
        // we set cache: false because GET requests are often cached by browsers
        // IE is particularly aggressive in that respect
        cache: false,
        data: { 'nombre': ruta.nombreRuta, 'origenNombre' : ruta.origenNombre, 'destinoNombre': ruta.destinoNombre, 'origen': ruta.origen, 'destino': ruta.destino, 'frecuencia': ruta.frecuencia },
        success: function (data) {

            $('#idRuta').val(data);
            alert("Ruta Creada Satisfactoriamente");
            
        },
        error: function (data) {

            alert('no se pudo crear la ruta')

        }
    });
}


function agregarParada() {

    var parada = {
        descripcion: $('#nombre-parada').val(),
        ubicacion: $('#ubicacion-parada').val(),
        idRuta: $('#idRuta').val()
    };
    $.ajax({
        url: "/Rutas/CreateParada",
        type: 'POST',
        dataType: 'json',
        // we set cache: false because GET requests are often cached by browsers
        // IE is particularly aggressive in that respect
        cache: false,
        data: { 'descripcion': parada.descripcion, 'ubicacion': parada.ubicacion, 'idRuta': parada.idRuta },
        success: function (data) {

            idRuta = data;

            $('#paradas-agregadas').append("<div class='row ubicacion'><div class='col-xs-6 col-sm-6 col-md-6>" + parada.descripcion + "</div></div>");
            alert("Parada Creada Satisfactoriamente");
        },
        error: function (data) {

            alert('no se pudo crear la parada')

        }
    });
}



