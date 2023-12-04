var { conexionComentarios } = require("./conexion");
var Comentario = require("../modelos/comentario");

async function mostrarComentarios() {
    var comentariosArray = [];
    try {
        var comentarios = await conexionComentarios.get();
        comentarios.forEach((comentario) => {
            var comentarioObjeto = new Comentario(comentario.id, comentario.data());
            if (comentarioObjeto.bandera == 0) {
                comentariosArray.push({
                    nombre: comentarioObjeto.nombre,
                    comentario: comentarioObjeto.comentario
                });
            }
        });
    } catch (err) {
        console.log("Error al obtener los comentarios de Firebase: " + err);
        comentariosArray.push(null);
    }
    return comentariosArray;
}

async function buscarComentarioPorID(id) {
    var comentarioObjeto;
    try {
        var comentarioBD = await conexionComentarios.doc(id).get();
        comentarioObjeto = new Comentario(comentarioBD.id, comentarioBD.data());
        if (comentarioObjeto.bandera != 0) {
            comentarioObjeto = null;
        }
    } catch (err) {
        console.log("Error al buscar el comentario: " + err);
        comentarioObjeto = null;
    }
    return comentarioObjeto;
}

async function nuevoComentario(datos) {
    var comentario = new Comentario(null, datos);
    var error = 1;
    if (comentario.bandera == 0) {
        try {
            // Solo guardamos nombre y comentario en la base de datos
            await conexionComentarios.doc().set({
                nombre: comentario.nombre,
                comentario: comentario.comentario
            });
            console.log("Comentario registrado correctamente");
            error = 0;
        } catch (err) {
            console.log("Error al registrar el comentario: " + err);
        }
    }
    return error;
}

async function modificarComentario(datos) {
    var comentario = await buscarComentarioPorID(datos.id);
    var error = 1;
    if (comentario != null) {
        comentario = new Comentario(datos.id, datos);
        if (comentario.bandera == 0) {
            try {
                // Actualizamos nombre y comentario en la base de datos
                await conexionComentarios.doc(comentario.id).set({
                    nombre: comentario.nombre,
                    comentario: comentario.comentario
                });
                console.log("Comentario actualizado correctamente");
                error = 0;
            } catch (err) {
                console.log("Error al modificar el comentario: " + err);
            }
        } else {
            console.log("Los datos no son correctos");
        }
    }
    return error;
}

async function borrarComentario(id) {
    var error = 1;
    var comentario = await buscarComentarioPorID(id);
    if (comentario != null) {
        try {
            await conexionComentarios.doc(id).delete();
            console.log("Comentario borrado");
            error = 0;
        } catch (err) {
            console.log("Error al borrar el comentario: " + err);
        }
    }
    return error;
}

module.exports = {
    mostrarComentarios,
    buscarComentarioPorID,
    nuevoComentario,
    modificarComentario,
    borrarComentario
};
