const express = require('express');
const path = require('path');
//varriables de entorno
require('dotenv').config();
//app de express
const app = express();

//creacion de servidor Node
const server = require('http').createServer(app); //enviamos la app como argumento
module.exports.io = require('socket.io')(server);

require('./sockets/socket');






//path publico o carpeta publica
const publicPath = path.resolve( __dirname, 'public')

app.use( express.static(publicPath) );



server.listen( process.env.PORT , ( err ) => {
    //si error
    if (err) throw new Error(err);
    //si todo bien
    console.log('Servidor corriendo en puerto!!!', process.env.PORT )
})