class Usuarios {

    constructor() {
        this.Personas = [];
    }

    AgregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.Personas.push(persona);
        return this.Persona;
    }

    ObtenerPersona(id) {
        let persona = this.Personas.filter(persona => persona.id === id)[0]; //Obtener una persona según el ID
        return persona;
    }

    ObtenerPersonas() {
        return this.Personas;
    }

    ObtenerPersonasPorSala(sala) {
        let personasEnSala = this.Personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    BorrarPersona(id) {
        let personaBorrada = this.ObtenerPersona(id);
        this.Personas = this.Personas.filter(persona => persona.id != id); //Elimina un usuario según el ID
        return personaBorrada;
    }

}


module.exports = {
    Usuarios
}