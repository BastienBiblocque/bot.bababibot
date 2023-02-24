const axios = require('axios');

class YoutubeRequest {
    getVideoTitle(videoId) {
        return axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=' + videoId + '&key=' + process.env.GOOGLE_API_KEY)
            .then(response => {
                const title = response.data.items[0].snippet.title;
                return this.removeParenthesesAndBrackets(title);
            })
            .catch(error => {
                console.error(error);
            });
    }

    removeParenthesesAndBrackets(str) {
        return str.replace(/ *\([^)]*\) */g, "").replace(/ *\[[^\]]*\] */g, "");
    }
}
module.exports = YoutubeRequest;