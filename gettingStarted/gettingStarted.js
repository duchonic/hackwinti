const http = require('http');
const assert = require('assert')

const os = require('os')

const repl = require('repl');
const msg = 'message';

const hostname = '127.0.0.1';
const port = 3000;


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//asserts
assert.strictEqual(1, 1);

//console out
console.log('morning %s', 'winti');
const name = 'David Hasselhoff';
console.warn(`Danger ${name}! Danger!`);

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    case 'time':
      var date = new Date();
      const myTime = ' time: ' + date.getHours() + ':'
                               + date.getMinutes() + ':'
                               + date.getMinutes();
      console.log(myTime);
    case 'exit':
      console.log('have a nice day');
      process.exit(0);
    default:
      console.log(`unknown cmd: '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});

//repl
//repl.start('> ').context.m = msg;

// const { Translator } = require('translator');
//
// const myTranslator = new Translator('en', 'fr');
//
// function myEval(cmd, context, filename, callback) {
//   callback(null, myTranslator.translate(cmd));
// }
//
// repl.start({ prompt: '> ', eval: myEval });


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  var date = new Date();
  const myArch = ' arch: ' + os.arch() + '\n';
  const myTime = ' time: ' + date.getHours() + ':'
                           + date.getMinutes() + ':'
                           + date.getMinutes() + '\n';

  res.end(myArch + myTime);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

