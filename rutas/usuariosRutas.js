// Importa los módulos y configuraciones necesarios
const express = require("express");
const ruta = express.Router();
const { autorizado } = require("../middlewares/password");
const { mostrarUsuarios, nuevoUsuario, buscarporID, modificarUsuario, borrarUsuario, login } = require("../bd/usuariosBD");
var { subirArchivos } = require("../middlewares/middlewares");
// Ruta para mostrar la lista de usuarios
ruta.get("/usu", autorizado, async (req, res) => {
    try {
        // Reemplaza cualquier referencia a 'usuarios' con tu lógica real
        var usuarios = await mostrarUsuarios();
        res.render("usuarios/mostrar", { usuarios });
    } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
        res.status(500).send("Error interno del servidor.");
    }
});

// Ruta para mostrar el formulario de nuevo usuario
ruta.get("/nuevousuario", (req, res) => {
    res.render("usuarios/nuevo");
});

// Ruta para procesar la creación de un nuevo usuario
ruta.post("/nuevousuario", subirArchivos(),async (req, res) => {
    try {
        // Lógica para agregar un nuevo usuario a la base de datos
        req.body.foto = req.file.filename;
        var error = await nuevoUsuario(req.body);
        res.redirect("/");
    } catch (error) {
        console.error("Error al crear un nuevo usuario:", error);
        res.status(500).send("Error interno del servidor.");
    }
});
ruta.get("/editarUsuario/:id", async (req, res) => {
  try {
      var user = await buscarporID(req.params.id);
      res.render("usuarios/modificar", { user });
  } catch (error) {
      console.error("Error al obtener usuario para editar:", error);
      res.status(500).send("Error interno del servidor.");
  }
});

ruta.post("/editarUsuario/:id", subirArchivos(), async (req, res) => {
  try {
      var user = await buscarporID(req.params.id);
      if (!user) {
          res.status(404).send("Usuario no encontrado.");
      } else {
          if (req.file != null) {
              req.body.foto = req.file.filename;
          } else {
              req.body.foto = req.body.fotoAnterior;
          }
          req.body.id = req.params.id; // Add this line to include user ID in the body
          var error = await modificarUsuario(req.body);
          res.redirect("/");
      }
  } catch (error) {
      console.error("Error al editar usuario:", error);
      res.status(500).send("Error interno del servidor.");
  }
});

// Ruta para borrar un usuario
ruta.get("/borrarUsuario/:id", async (req, res) => {
    try {
        var usuario = await buscarporID(req.params.id);
        if (!usuario) {
            res.status(404).send("Usuario no encontrado.");
        } else {
            var archivo = usuario.foto;
            await borrarUsuario(req.params.id);
            eliminarArchivo(archivo)(req, res, () => {
                res.redirect("/");
            });
        }
    } catch (error) {
        console.error("Error al borrar el usuario:", error);
        res.status(500).send("Error interno del servidor.");
    }
});

// Ruta para mostrar el formulario de inicio de sesión
ruta.get("/login", (req, res) => {
    res.render("usuarios/login");
});

// Ruta para procesar el inicio de sesión
ruta.post("/login", async (req, res) => {
  var user = await login(req.body);
  if (user == undefined) {
      res.redirect("/login");
  } else {
      if (user.admin =true) {
          req.session.admin = req.body.usuario;
          res.render("info/inicio");
      } else {
          req.session.usuario = req.body.usuario;
          res.redirect("/");
      }
  }
});
// Ruta para cerrar sesión
ruta.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
});

// Ruta para mostrar el formulario de registro
ruta.get("/registro", (req, res) => {
    res.render("usuarios/registro");
});

// Exporta la ruta
module.exports = ruta;
