'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });

  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":"bar"}\n');
  });

  it('should emit a message event from split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":');
    process.nextTick(() => stream.emit('data', '"bar'));
    process.nextTick(() => stream.emit('data', '"}\n'));
  });

  it('should throw an exception when the constructor is null', done => {
    assert.throws(()=>{
        new LDJClient(null);
        });
    done();
  });

  it ('Should throw an exception when it is not a JSON message', done =>{
    assert.throws(()=>{
      stream.emit('data', '{"foo"\n');
    })
    done();
  })

  it ('Should proofs that if the message is complete but not with new line', done=>{
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo": "bar"}');
    stream.emit('close');
  })

});
