[![license](https://img.shields.io/github/license/MKIsHereOficial/yt_search?label=license&style=for-the-badge)](https://github.com/MKIsHereOficial/yt_search/blob/main/LICENSE)
[![issues](https://img.shields.io/github/issues/MKIsHereOficial/yt_search?style=for-the-badge)](https://github.com/MKIsHereOficial/yt_search/issues)

# yt_search
Um repositório simples para yt-search.

--------------------------------------

Para pesquisar apenas um vídeo:
```js
const yts = require("@mkishereoficial/yt_search");
let video = await yts("Breakbot - Baby I'm Yours");

console.log(video);
// > retorna um Objeto com as informações do vídeo, incluindo o url;

console.log(video.url);
// > "https://youtube.com/watch?v=6okxuiiHx2w"
```


Para uma pesquisa múltipla:
```js
const yts = require("@mkishereoficial/yt_search");
let videos = await yts.multi("Katy Perry", 9); // "Katy Perry" = query, 9 = limite de resultados
let video = await videos[0];

console.log(videos);

console.log(`\n\n` + video.url);
// > videos retorna um Array de Objetos, cada um contendo suas próprias informações. o limite que eu dei foi de 15, mas pode ser qualquer número (o padrão é 5).
// video retorna um Objeto (Object) contendo as informações do vídeo
```
