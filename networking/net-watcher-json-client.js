​ 	​'use strict'​;
​ 	​const​ net = require(​'net'​);
​ 	​const​ client = net.connect({port: 60300});
/**
 * This create a listener for data waiting a JSON file
 * @param event event type expected
 * @param function Parse the JSON files and show the correct message
 */
​ 	client.on(​'data'​, data => {
​ 	  ​const​ message = JSON.parse(data);
​ 	  ​if​ (message.type === ​'watching'​) {
​ 	    console.log(​`Now watching: ​${message.file}​`​);
​ 	  } ​else​ ​if​ (message.type === ​'changed'​) {
​ 	    ​const​ date = ​new​ Date(message.timestamp);
​ 	    console.log(​`File changed: ​${date}​`​);
​ 	  } ​else​ {
​ 	    console.log(​`Unrecognized message type: ​${message.type}​`​);
​ 	  }
​ 	});