var ruta = require("express").Router();
var { conexionComentarios } = require("../bd/conexion");
var { nuevoComentario } = require("../bd/comentario");

// Renderiza la página de mostrar comentarios
ruta.get('/mostrarcomentarios', async (req, res) => {
  try {
    const comentariosSnapshot = await conexionComentarios.get();
    const comentarios = comentariosSnapshot.docs.map((doc) => doc.data());

    // Ruta relativa al directorio 'views/infousu'
    res.render('infousu/com', { comentarios });  // Asegúrate de tener 'com.ejs' en tu directorio de vistas
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Maneja la publicación de comentarios
ruta.post("/publicar", async (req, res) => {
  try {
    const { nombre, texto } = req.body;

    // Crea un nuevo comentario con un ID específico
    const nuevoComentarioObjeto = {
      nombre,
      comentario: texto,
      fecha: new Date(),
      bandera: 0,
    };

    // Guarda el nuevo comentario en la base de datos
    await nuevoComentario(nuevoComentarioObjeto);

    // Redirige a la página de mostrar comentarios después de publicar
    res.redirect("/mostrarcomentarios");
  } catch (error) {
    console.error("Error al publicar el comentario:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Nueva ruta para mostrar el perfil del usuario
ruta.get("/perfil", (req, res) => {
  // Puedes personalizar la lógica para obtener y mostrar el perfil del usuario actual
  res.render("infousu/perfil");
});

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
ruta.get("/comentariosGen", (req, res) => {
  res.render("infousu/com");
});

module.exports = ruta;
