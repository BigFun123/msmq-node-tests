const msmq = require('node-msmq');
const express = require('express'); 

// serve index.html with express
const app = express();
app.use(express.static('public'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));

var queue = msmq.openOrCreateQueue('.\\Private$\\MyAwesomeQueue');

// create a route for the queue messages
app.get('/messages', (req, res) => {
  var messages = queue.getAllMessages();
  var bodies = messages.map(message=>JSON.stringify(message));
  res.send(bodies);
});

app.get('/purge', (req, res) => {
  queue.purge();
  res.send(`{"message":"Purged"}`);
});

// delete a message from the queue
app.get('/delete/:id', (req, res) => {
  var messages = queue.getAllMessages();
  var bodies = messages.map(message=>message.body);
  var id = req.params.id;
  var message = bodies[id];
  queue.deleteMessage(message);
  res.send(`{"message":"Deleted"}`);
});

// return one message from the queue
app.get('/message/:id', (req, res) => {
  var messages = queue.getAllMessages();
  var bodies = messages.map(message=>message.body);
  var id = req.params.id;
  var message = bodies[id];
  res.send(message);
});

// Start receiving messages from the queue
/*
setInterval(()=>{
  var messages = queue.getAllMessages();
  var bodies = messages.map(message=>message.body);
  console.log("Length:" + messages.length, bodies);
}, 1000);
*/
