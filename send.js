const msmq = require('node-msmq');

var qqueue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');

// Send message to queue
for(var i=0; i< 100; i++) {
    var test = {"id": i, "message": "Hello World!"}
    qqueue.send(JSON.stringify(test));
}
