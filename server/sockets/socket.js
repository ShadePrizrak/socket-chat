const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', function(data, callback) {
        console.log(data);
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre  y la sala son necesario'
            });
        }

        client.join(data.sala);

        let personas = usuarios.AgregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.ObtenerPersonasPorSala(data.sala));

        console.log('Usuario ' + data.nombre + ' se ha conectado');
        callback(null, usuarios.ObtenerPersonasPorSala(data.sala));
    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.ObtenerPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let Persona = usuarios.BorrarPersona(client.id);
        console.log('Usuario ' + Persona.nombre + ' se ha desconectado');
        client.broadcast.to(Persona.sala).emit('crearMensaje', crearMensaje('Administrador', `${Persona.nombre} salió`));
        client.broadcast.to(Persona.sala).emit('listaPersonas', usuarios.ObtenerPersonasPorSala(Persona.sala));
    });

    //Mensaje privado
    client.on('mensajePrivado', data => {
        let persona = usuarios.ObtenerPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});