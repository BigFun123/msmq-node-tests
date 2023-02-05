const msmq = require('node-msmq');

var queue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');

// Send message to queue
queue.send('Hello from Node.JS!');