//importaciones
const { io } = require('../index');
const Bands = require('../models/bands'); //importacion modelo Bands node
const Band = require('../models/band');

//cuando se reinicializa el servidor las bandas se recargan a 0
const bands = new Bands(); //nueva instanacia de Bands )=

bands.addBand( new Band('Queen'));
bands.addBand( new Band('Incubus'));
bands.addBand( new Band('Green Day'));
bands.addBand( new Band('The Doors'));
// console.log(bands);


//mensajes de sockets
// const{io} = require('../index');
// const Band = require('../models/band');



//mensajes de sockets
io.on('connection', client => {

    console.log('Cliente Conectado');

    //al conectar un cliente le emitire las bandas que tengo registradas
    client.emit('active-bands', bands.getBands() );

    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

    //escuchando //es lo que hara cuando llame al evento 'mensaje'
    client.on('mensaje',( payload )=>{
        console.log('Recibi un mensaje de un Cliente!!', payload );

        //es lo que hara el servidor como respuesta al mensaje del cliente
        //mensaje a todos los clientes conectados
        io.emit('mensaje',{admin: 'Nuevo mensaje del servidor'} ) ;

    });

    client.on('vote-band',( payload )=>{
        
        // console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands() );

    });

    client.on('add-band', ( payload ) =>{
        
        //creacion de la Banda nueva con el modelo de node
        const newBand = new Band(payload.name);
        //    console.log( payload );
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', ( payload ) => {

        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
        

    });
    
    
    // //necesito escuchar por 'nuevo-mensaje'
    // client.on('emitir-mensaje',( payload )=>{ //escucha 'emitir-mensaje' de Chrome con payload 

    //     // io.emit('nuevo-mensaje', payload); //  luego emite un evento llamado 'nuevo-mensaje' con el payload
    //     // console.log(payload);
    //     //si quiero emitir a todos menos al origen que lo emite originalmente
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // })



  });