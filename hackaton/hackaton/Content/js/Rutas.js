

$(document).ready(function () {
    $('#agregar-ruta').click(function () {
        agregarRuta();


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

            alert('good')
            
        },
        error: function (data) {

            alert('error')

        }
    });
}