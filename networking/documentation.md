<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [net-watcher-json-client.js][1]
-   [on][2]
    -   [Parameters][3]
-   [on][4]
    -   [Parameters][5]
-   [on][6]
    -   [Parameters][7]
-   [net-watcher-ldj-client.js][8]
-   [ldj-client.js][9]
-   [LDJClient][10]
    -   [Parameters][11]
    -   [connect][12]
        -   [Parameters][13]
-   [net-watcher-unix.js][14]
-   [listen][15]
    -   [Parameters][16]
-   [listen][17]
    -   [Parameters][18]
-   [listen][19]
    -   [Parameters][20]
    -   [Parameters][21]
-   [net-watcher.js][22]
    -   [Parameters][23]
-   [test-json-service.js][24]
-   [server][25]
    -   [Parameters][26]

## net-watcher-json-client.js

It create a listener for data waiting a JSON file.

## on

Client listener

### Parameters

-   `event`  event type expected
-   `function`  Parse the JSON files and show the correct message

## on

This create a listener for message waiting a JSON file completed

### Parameters

-   `event`  event type expected (message)
-   `function`  Parse the message and show the correct message

## on

Waits for a close events to make sure if some message is complety on the buffer

### Parameters

-   `close` **[event][27]** Event which is expected
-   `function`  Look for a complete message on the buffer

## net-watcher-ldj-client.js

Create a ldj client

## ldj-client.js

Module to decode JSON packages

## LDJClient

**Extends EventEmitter**

Class which is a client which expect a JSON package and emit a message

### Parameters

-   `stream` **[stream][28]** It is from where the packages are reveived

### connect

Allows you to call the client as a method connect

#### Parameters

-   `stream` **[stream][28]** the stream which is used to send the messages

## net-watcher-unix.js

Server through unix socket

## listen

Create a server

### Parameters

-   `function`  Emits the server messages and states

## listen

Create a server

### Parameters

-   `function`  Emits the server messages and states

## listen

Listen for a connection

### Parameters

-   `port`  Port in which have to listen
-   `function`  Emits the server messages and states

## 

Create a listener on a unix file

### Parameters

-   `filename`  Name of the file expected
-   `function`  message shown

## net-watcher.js

Basic server

## 

Create a listener

### Parameters

-   `port`  Port in which you have to listen
-   `function`  EMessage to show

## test-json-service.js

Simulate the messages to test a client

## server

Create a simulation of a server

### Parameters

-   `function`  Emits the server messages and states

[1]: #net-watcher-json-clientjs

[2]: #on

[3]: #parameters

[4]: #on-1

[5]: #parameters-1

[6]: #on-2

[7]: #parameters-2

[8]: #net-watcher-ldj-clientjs

[9]: #ldj-clientjs

[10]: #ldjclient

[11]: #parameters-3

[12]: #connect

[13]: #parameters-4

[14]: #net-watcher-unixjs

[15]: #listen

[16]: #parameters-5

[17]: #listen-1

[18]: #parameters-6

[19]: #listen-2

[20]: #parameters-7

[21]: #parameters-8

[22]: #net-watcherjs

[23]: #parameters-9

[24]: #test-json-servicejs

[25]: #server

[26]: #parameters-10

[27]: https://developer.mozilla.org/docs/Web/API/Event

[28]: https://nodejs.org/api/stream.html