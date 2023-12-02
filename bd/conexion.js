var admin = require("firebase-admin");
var keys = require("../keys.json");

admin.initializeApp({
    credential: admin.credential.cert(keys)
});

var db = admin.firestore();
var conexionUsuarios = db.collection("miejemploBD");
var conexionProductos = db.collection("productos");
var conexionComentarios = db.collection("comentarios");

module.exports = {
    conexionUsuarios,
    conexionProductos,
    conexionComentarios
};
