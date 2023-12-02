var ruta=require("express").Router();
//const conexion = require("../bd/conexion");
//var { conexionComentarios } = require("../bd/conexion");
/*var { mostrarComentarios,
    buscarComentarioPorID,
    nuevoComentario,
    modificarComentario,
    borrarComentario}=require("../bd/comentario");
/*ruta.get("/comentarios", async (req, res) => {
  try {
    const comentariosSnapshot = await conexionComentarios.get();
    const comentarios = comentariosSnapshot.docs.map(doc => doc.data());
    
    res.render("comentarios", { comentarios });
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).send("Error interno del servidor");
  }
});*/
ruta.get("/acerca", (req, res) => {
    res.render("info/acercade");
  });
  
  ruta.get("/comentarios", (req, res) => {
    res.render("info/comentarios");
  });
  
  ruta.get("/inicio", (req, res) => {
    res.render("info/inicio");
  });
  ruta.get("/acercaUsu", (req, res) => {
    res.render("infousu/acercade");
  });
  
  ruta.get("/comentariosUsu", (req, res) => {
    res.render("infousu/comentarios");
  });
  
  ruta.get("/inicioUsu", (req, res) => {
    res.render("infousu/inicio");
  });

module.exports = ruta;
