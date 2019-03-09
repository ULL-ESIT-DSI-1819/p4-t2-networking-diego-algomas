/**
 * Module to decode JSON packages
 * @name ldj-client.js
 */
'use strict';
const EventEmitter = require('events').EventEmitter;
/**    
* Class which is a client which expect a JSON package and emit a message
* @extends EventEmitter
*/
class LDJClient extends EventEmitter {
  /**    
* Constructor which make sure the stream is not null and create the message when a whole Json package is received
* @param {stream} stream It is from where the packages are reveived
*/
  constructor(stream) {
    if(stream === null){
      throw new Error('null stream');
    }
    super();
    let buffer = '';
    stream.on('data', data => {
      buffer += data;
      let boundary = buffer.indexOf('\n');
      while (boundary !== -1) {
        const input = buffer.substring(0, boundary);
        buffer = buffer.substring(boundary + 1);
        try{
          this.emit('message', JSON.parse(input));
        }catch(e){
          throw new Error('not a JSON');
        }
        boundary = buffer.indexOf('\n');
      }
    });
    /**    
* Waits for a close events to make sure if some message is complety on the buffer
* @param {event} close Event which is expected
* @param function Look for a complete message on the buffer
*/
    stream.on('close', data => {
      let boundary = buffer.indexOf('}');
      if (boundary !== -1) {
        const input = buffer.substring(0, boundary+1);
        try{
          this.emit('message', JSON.parse(input));
        }catch(e){
          throw new Error('not a Json');
        }
      }
      this.emit('close');
  });
  }


/**    
* Allows you to call the client as a method connect
* @param {stream} stream the stream which is used to send the messages
*/
  static connect(stream) {
    return new LDJClient(stream);
  }
}


module.exports = LDJClient;
