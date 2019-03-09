/**
 * Basic server
 * @name net-watcher.js
 */
'use strict'

const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if(!filename){
    throw Error('Error: No filename specified');
}
/**
 * Create a server
 * @param function Emits the server messages and states
 */
net.createServer(connection=>{
    //Reporting
    console.log('Subcriber connected.');
    connection.write(JSON.stringify({type:'watching',file:filename})+`\n`);

    //Watcher setup
    const watcher = fs.watch(filename,()=>connection.write(JSON.stringify({tpe:'changed',timestamp: Date.now()})+`\n`));

    //Cleanup
    connection.on('close',()=>{
        console.log('Subscriber diconnected');
        watcher.close();
    });
})
/**
 * Create a listener
 * @param port Port in which you have to listen
 * @param function EMessage to show
 */
.listen(60300,()=>console.log('Listening for subscriber...'));