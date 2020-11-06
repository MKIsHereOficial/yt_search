const yts = require('./main.js');

async function test() {
  let video = yts('Coffe for your head');
  
  console.log(video);
}

test();
