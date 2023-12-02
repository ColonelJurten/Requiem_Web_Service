class Comentario {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.nombre = data.nombre;
        this.comentario = data.comentario;
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
        if (this._id == null) {
            return {
                nombre: this.nombre,
                comentario: this.comentario,
            };
        } else {
            return {
                id: this.id,
                nombre: this.nombre,
                comentario: this.comentario,
            };
        }
    }
}

module.exports = Comentario;
