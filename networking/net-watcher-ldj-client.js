

'use strict'
const netClient = require('net').connect({port: 60300});
const ldjClient = require('./lib/ldj-client.js').connect(netClient);

/**
 * This create a listener for message waiting a JSON file completed
 * @param event event type expected (message)
 * @param function Parse the message and show the correct message
 */
ldjClient.on('message', message => {
  if (message.type === 'watching') {
    console.log(`Now watching: ${message.file}`);
  } else if (message.type === 'changed') {
    console.log(`File changed: ${new Date(message.timestamp)}`);
  } else {
    throw Error(`Unrecognized message type: ${message.type}`);
  }
});
