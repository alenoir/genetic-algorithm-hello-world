import Population from './src/Population';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Words: ', (words) => {
  rl.question('Population length: ', (length) => {
    const pop = new Population(words, length);

    pop.generation();

    rl.close();
  });
});
