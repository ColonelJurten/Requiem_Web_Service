var express=require("express");
var path=require("path");
var cors=require("cors");
var session=require("cookie-session");
var usuariosRutas=require("./rutas/usuariosRutas");
var productosRutas = require ("./rutas/productosRutas")
var rutasUsuariosApi= require("./rutas/usuariosRutasApi");
var rutasProductosApi = require("./rutas/productosRutasApi"); 
var rutasinfo = require("./rutas/infoRutas");
//var loginRutas = require("./rutas/loginRutas");

var app=express();
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname,"/web")));
app.use(cors());
app.use(session({
    name:"session",
    keys:["CDDCDC"],
    maxAge:24*60*60*1000
}));
app.get("/", (req, res) => {
    res.render("info/inicio");
  });
app.use("/", usuariosRutas, productosRutas, rutasUsuariosApi, rutasProductosApi, rutasinfo);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});
