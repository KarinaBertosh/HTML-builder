const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var output = fs.createWriteStream('02-write-file/text.txt');
process.stdin.pipe(output)

rl.question('What is your name ? ', function (name) {
  if (name === 'exit') {
    byBy()
  }
});


rl.on('close', function () {
  byBy()
});

const byBy = () => {
  console.log('\nBYE BYE !!!');
  process.exit(0);
}

rl.on('history', (history) => {
  if (history[0] === 'exit') {
    byBy()
  }
});

