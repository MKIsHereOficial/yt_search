async function test() {
  const yts = await require('./main.js');
  let video = await yts('Coffe for your head');

  console.log(video);
}

test();
