require('dotenv').config()

const { Client, Events, GatewayIntentBits } = require('discord.js');
const YoutubeRequest = require("./google");
const SpotifyRequest = require("./spotify");

const youtubeRequest = new YoutubeRequest();
const spotifyRequest = new SpotifyRequest();

const prefixLong = 'https://www.youtube.com/watch?v=';
const prefixShort = 'https://youtu.be/';

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Événement de réception de message
client.on('messageCreate', (message) => {
    console.log(message.content)
    if (message.content.startsWith(prefixLong) && !message.author.bot) {
        sendSpotifyLinkWithYoutubeId(message, message.content.slice(prefixLong.length))
    }
    else if (message.content.startsWith(prefixShort) && !message.author.bot) {
        sendSpotifyLinkWithYoutubeId(message, message.content.slice(prefixShort.length))
    } else if (message.content === 'quoi' && !message.author.bot) {
        message.reply('FEUR');
    }
})

function sendSpotifyLinkWithYoutubeId(message, youtubeId) {
    youtubeRequest.getVideoTitle(youtubeId).then(title => {
        spotifyRequest.getSongUrl(title).then(url => {
            message.reply(url).then();
        });
    });
}

client.login(process.env.DISCORD_TOKEN)
