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
    connection.write(`Now watching "${filename}"for changes /n`);

    //Watcher setup
    const watcher = fs.watch(filename,()=>connection.write(`File changed: ${new Date()}/n`));

    //Cleanup
    connection.on('close',()=>{
        console.log('Subscriber diconnected');
        watcher.close();
    });
})
/**
 * Create a listener on a unix file
 * @param filename Name of the file expected
 * @param function message shown
 */
.listen('/tmp/watcher.sock', () => console.log('Listening for subscribers...'));