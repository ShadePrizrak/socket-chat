var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(err, resp) {
        if (err) {
            console.log('Error en la conexión');
            throw new Error(err);
        }
        console.log('Usuario conectados', resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Mensaje del servidor:', mensaje);

});

//Esuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});

//Mensaje privado - Escuchar
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado ', mensaje);
});