async function test(options) {
  const yts = await require('./main.js');
  let video = await yts('beabadoobee - Coffe for your head remix', options);

  console.log(video);
}

test({lang: 'pt-br'});
