'use strict';
const EventEmitter = require('events').EventEmitter;
class LDJClient extends EventEmitter {
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



  static connect(stream) {
    return new LDJClient(stream);
  }
}


module.exports = LDJClient;
