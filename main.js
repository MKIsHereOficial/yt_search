const version = require("./package.json").version;

const yts = require( 'yt-search' );
const numeral = require('numeral'), {Duration} = require('luxon');


let language = "pt";
let translate = require('@vitalets/google-translate-api');
async function traduzir (value) {
	let data = "Unavailable";
	await translate(value, {to: language}).then(async (res) => {
		data = res.text;
	})
	return data;
}

async function search (value, options) {
	if (!value) throw new Error("O Valor da Pesquisa não foi identificado. VVerifique se é uma String.");

    const r = await yts(value);

    const videos = r.videos.slice( 0, 5 );

    let video = videos[0];
    
    let views = numeral(parseFloat(video.views));
    views = {completeValue: views.value(), string: views.format('0a')};
    let duration = video.timestamp;
    duration = {string: duration, time: {}};

    let durationS = duration.string.replace(":", "").replace(":", "");
    if (durationS.length == 4) durationS = "00" + durationS;
    if (durationS.length == 3) durationS = "000" + durationS;

    durationS = {
        0: durationS[0] + "" +durationS[1],
        1: durationS[2] + "" +durationS[3],
        2: durationS[4] + "" +durationS[5]
    };

    duration.string = durationS[0] + ":" + durationS[1] + ":" + durationS[2];
    duration.time = {seconds: Duration.fromISOTime(duration.string).toMillis() / 1000, milli: Duration.fromISOTime(duration.string).toMillis()};

    ///////////////////////////////////////////////////////////////////

	let obj = {
		duration: duration,
		title: video.title,
		url: video.url,
		id: video.videoId,
		description: video.description,
		imageURL: function get () {
			return video.image;
		},
		thumbnailURL: function get () {
			return video.thumbnail;
		},
		ago: (async => {
            if (options) {
                if (options.lang) {
                    switch (options.lang.toLowerCase()) {
                        case "pt-br":
                            return video.ago.replace('months', "meses").replace('month', "mês").replace("ago", "atrás");
                            break;
                        case "pt_br":
                            return video.ago.replace('months', "meses").replace('month', "mês").replace("ago", "atrás");
                            break;
                        default:
                            return video.ago;
                            break;
                    }
                }
            } else {
                return video.ago;
            }
        })(),
		author: {
			name: video.author.name,
			url: video.author.url,
			},
		views
    };
    
    obj.downloadURL = (async => {
        let url = `https://www.y2mate.com/pt/youtube/${obj.id}`;

        return url;
    })();
  return obj;
}
async function multi_search(searchValue, maxVideos) {
	if (searchValue.length <= 0) throw new Error("O Valor da Pesquisa não foi identificado. Verifique se é uma String.");

	if (!maxVideos) {
		console.log(`Você não espeficou o parâmetro maxVideos. Este deve ser um número, no qual especifica-se o número máximo de vídeos no array.`)
		maxVideos = 5;
	} else if (isNaN(maxVideos)) {
		throw new Error("O parâmetro maxVideos deve ser um número, no qual especifica-se o número máximo de vídeos no array.");
	}

	const r = await yts(searchValue);
	if (!r.videos) throw new Error("Nenhum vídeo foi encontrado.");

	const vids = r.videos.slice( 0, maxVideos );
	const videos = await vids.map(async (video) => {
		const obj = {
			duration: video.timestamp,
			title: video.title,
			url: video.url,
			id: video.videoId,
			description: video.description,
			imageURL: function get () {
				return video.image;
			},
			thumbnailURL: function get () {
				return video.thumbnail;
			},
			ago: video.ago,
			author: {
				name: video.author.name,
				url: video.author.url,
				},

			views: video.views.toLocaleString(),
			downloadURL: function get () {
				let url = `https://www.y2mate.com/pt/youtube/${this.id}`;

				return url;
			}

		};

	  return obj;
	});

	if (!videos) throw new Error("Nenhum vídeo foi encontrado.");

	return videos;
}

module.exports = search;
module.exports.multi = multi_search;
module.exports.search = multi_search;
module.exports.language = language;
module.exports.version = version;
