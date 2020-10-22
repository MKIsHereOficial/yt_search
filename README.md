# yt_search
Um repositório simples para yt-search.

--------------------------------------

Para pesquisar:
```js
const yts = require('yt_search');

let video = await yts("Breakbot - Baby I'm Yours");
// > return Object;

console.log(video.url);
// > "https://youtube.com/watch?v=6okxuiiHx2w"
```
