const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const timeoutScheduled = Date.now();
const fs = require('fs');

var headJson = require("../db.json");

var obj;
fs.readFile('../db.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

const server = http.createServer((req, res) => {
  debugger;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  res.end('blub');

  console.log("tasks:", obj.tasks);
  console.log("comments:", obj.comments);


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
