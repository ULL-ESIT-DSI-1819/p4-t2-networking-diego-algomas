'use strict'

const net = require('net');
let user = 0;
let socket = [];
//Leerse splice e indexof

function broadcast(message,index){
    socket.forEach(function(element){
        if(index != socket.indexOf(element)){
            element.write(`user${index} > ${message}`);
        }
    })
};


net.createServer(connection=>{
    //Guardar socket
    socket.push(connection);
    
    //Reporting
    console.log(`Subcriber user${user} connected.`);
    connection.write('You have joined the chat'+'\n');
    broadcast(`*user${user} have joind the chat*`+'\n',user);

    //enviar mensaje
    connection.on('data', data=>{
        //Enviar el mensaje a todos los usuarios
        console.log(`user${socket.indexOf(connection)} >`+data.toString());
        broadcast(data,socket.indexOf(connection));
    })

    //Cleanup
    connection.on('close',()=>{
        
        console.log(`Subscriber user${socket.indexOf(connection)} diconnected`);  
        broadcast(`Subscriber user${socket.indexOf(connection)} diconnected\n`,socket.indexOf(connection));
        socket.splice(socket.indexOf(connection),1);
        socket.forEach(function(element){
            element.write(`Now you have become user${socket.indexOf(element)}`+'\n');
        })
    });
    user++;
})
.listen(60300,()=>console.log('Chat waiting for users...'));