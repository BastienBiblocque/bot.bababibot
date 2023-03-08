const SpotifyWebApi = require('spotify-web-api-node');

class SpotifyRequest {
    constructor() {
        this.spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        });
        this.spotifyApi.setAccessToken(process.env.SPOTIFY_CLIENT_TOKEN);
    }
    getSongUrl(songName) {
        return this.spotifyApi.searchTracks(songName).then(
            function(data) {
                return data.body.tracks.items[0].external_urls.spotify;
            },
            function(err) {
                console.error(err);
            }
        );
    }
}
module.exports = SpotifyRequest;