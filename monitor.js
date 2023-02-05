const msmq = require('node-msmq');

var queue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');

// Start receiving messages from the queue
setInterval(()=>{
  var messages = queue.getAllMessages();
  console.log(messages);
}, 1000);


