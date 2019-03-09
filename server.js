/**
 * Basic empty server
 * @name server.js
 */

"use strict"
const net = require('net');
/**    
* First aproximation to a server
* @param function do whatwver you have to 
*/
const server = net.createServer(function(connection){
        //usar un objeto de coneccion para la transferencia de datos
    });
    /**    
* Make the server listen on a port
* @param port Port that you should listen 
*/
    server.listen(5432);