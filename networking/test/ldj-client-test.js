'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');
/**    
* Create a name context for the Mocha test
* @param name Add the name of thecontext
* @param function Make the test
*/
describe('LDJClient', () => {
  let stream = null;
  let client = null;
/**    
* Inicializate the variables for the test
* @param function It makes the inizialization
*/
  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });
/**    
* Test if you recibe a message correctly
* @param {string} name Named the test that is going to run
* @param function test. Listen for a message and check if it is the same that we sent
*/
  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":"bar"}\n');
  });
/**    
* Test if you recibe a message correctly if you send it on to data events
* @param {string} name Named the test that is going to run
* @param function test. Listen for a message and check if it is the same that we sent emitting the message on some data events
*/
  it('should emit a message event from split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":');
    process.nextTick(() => stream.emit('data', '"bar'));
    process.nextTick(() => stream.emit('data', '"}\n'));
  });
/**    
* Test if it handle a null constructor 
* @param {string} name Named the test that is going to run
* @param function test. Expect for a exception to be thrown 
*/
  it('should throw an exception when the constructor is null', done => {
    assert.throws(()=>{
        new LDJClient(null);
        });
    done();
  });

/**    
* Test if you recibe a message correctly
* @param {string} name Named the test that is going to run
* @param function test. And exception should be thrown if you send something different to a JSON package
*/
  it ('Should throw an exception when it is not a JSON message', done =>{
    assert.throws(()=>{
      stream.emit('data', '{"foo"\n');
    })
    done();
  })
/**    
* Test if you recibe a message correctly
* @param {string} name Named the test that is going to run
* @param function test. Test what happend when you do not send the end of line character at the end of the package
*/
  it ('Should proofs that if the message is complete but not with new line', done=>{
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo": "bar"}');
    stream.emit('close');
  })

});
