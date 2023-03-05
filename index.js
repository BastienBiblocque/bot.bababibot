require('dotenv').config()
//HEROKU TEST
const host = 'localhost';
const port = 3000;


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
    const quoiValue = ['quoi', 'Quoi', 'quoi ?', 'Quoi ?'];
    const heinValue = ['hein', 'Hein', 'hein ?', 'Hein ?'];
    const random = Math.random();
    console.log(random)
    if (message.content.startsWith(prefixLong) && !message.author.bot) {
        // sendSpotifyLinkWithYoutubeId(message, message.content.slice(prefixLong.length))
    }
    else if (message.content.startsWith(prefixShort) && !message.author.bot) {
        // sendSpotifyLinkWithYoutubeId(message, message.content.slice(prefixShort.length))
    }
    else if ((quoiValue.includes(message.content) || message.content.endsWith('quoi ?') || message.content.endsWith('quoi')) && !message.author.bot) {
        message.reply('FEUR');
    } else if (heinValue.includes(message.content) && !message.author.bot) {
        message.reply('Deux trois t\'es une oie, quatre cinq six t\'es une saucisse.');
    } else if (message.content === 'Quelle est le GOTY 2022 ?') {
        message.reply('Bah Elden Ring évidement.');
    } else if (random < 0.05 && !message.author.bot) {
        console.log("héhé");
        message.reply('https://media.tenor.com/8Ne_GzdBcikAAAAC/les-artisans-rotisseurs-palmashow.gif');
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
