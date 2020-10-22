// Arquivo para testes

async function test () {
  const yts = await require("@mkishereoficial/yt_search");
  let video = yts("Breakbot - Baby I'm Yours");
  
  console.log(`URL de "${video.title}": `, video.url);
}

test();
