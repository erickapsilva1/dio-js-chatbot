const Youtube = require('youtube-node');
const config = require('./yt-config');

const youtube = new Youtube();
youtube.setKey(config.key);

function searchVideoUrl(message, queryText){
    return new Promise((resolve, reject) => {
        youtube.search(`Exercício em casa para biceps ${queryText}`, 2, function(erro, result){
            if(!erro){
                const videosIds = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videosIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
            }else{
                console.log('Deu erro.');
            }
        });
    });
}

module.exports.searchVideoUrl = searchVideoUrl;