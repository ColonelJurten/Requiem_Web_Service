class Comentario {
    constructor(id, data) {
        this.bandera = 0;
        this._id = id;
        this._nombre = data.nombre;
        this._comentario = data.comentario;
    }

    set id(id) {
        if (id != null) {
            id.length > 0 ? this._id = id : this.bandera = 1;
        }
    }

    set nombre(nombre) {
        nombre.length > 0 ? this._nombre = nombre : this.bandera = 1;
    }

    set comentario(comentario) {
        comentario.length > 0 ? this._comentario = comentario : this.bandera = 1;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get comentario() {
        return this._comentario;
    }

    get obtenerComentario() {
        return this._id
            ? { id: this._id, nombre: this._nombre, comentario: this._comentario }
            : { nombre: this._nombre, comentario: this._comentario };
    }
}

module.exports = Comentario;
