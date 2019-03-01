"use strict"
const 
    net = require('net'),
    server = net.createServer(function(connection){
        //usar un objeto de coneccion para la transferencia de datos
    });
    server.listen(5432);