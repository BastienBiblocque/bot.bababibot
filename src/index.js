require('dotenv').config()


const { Client, Events, GatewayIntentBits } = require('discord.js');
const YoutubeRequest = require("./class/google");
const SpotifyRequest = require("./class/spotify");
const Meteo = require("./class/meteo");
const Food = require("./class/food");

const youtubeRequest = new YoutubeRequest();
const spotifyRequest = new SpotifyRequest();
const meteoRequest = new Meteo();
const foodRequest = new Food();

const prefixLong = 'https://www.youtube.com/watch?v=';
const prefixShort = 'https://youtu.be/';

const prefixMeteo = 'b! meteo';
const prefixFood = 'b! food';

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
    const usermessage = message.content.toLowerCase();
    const quoiValue = ['quoi', 'quoi ?', 'koi', 'koi ?'];
    const heinValue = ['hein', 'hein ?'];
    const random = Math.random();
    if (message.author.bot) {
        console.log('bot');
    } else if (usermessage.startsWith(prefixFood)) {
        sendFood(usermessage);
    } else if (usermessage.startsWith(prefixMeteo)) {
        sendWeather(usermessage);
    } else if (usermessage.startsWith(prefixLong)) {
        // sendSpotifyLinkWithYoutubeId(message, usermessage.slice(prefixLong.length))
    } else if (usermessage.startsWith(prefixShort)) {
        // sendSpotifyLinkWithYoutubeId(message, usermessage.slice(prefixShort.length))
    } else if ((quoiValue.includes(usermessage) || usermessage.endsWith('quoi ?') || usermessage.endsWith('quoi'))) {
        message.reply('FEUR');
    } else if ((heinValue.includes(usermessage) || usermessage.endsWith('hein') || usermessage.endsWith('hein ?') || usermessage.endsWith('hein?'))) {
        message.reply('Deux trois t\'es une oie, quatre cinq six t\'es une saucisse.');
    } else if (usermessage === 'Quelle est le GOTY 2022 ?') {
        message.reply('Bah Elden Ring évidement.');
    } else if (usermessage === 'Bonne nuit') {
        message.reply('Bonne nuit bébou :point_right: :point_left: ');
    } else if (random < 0.01) {
        balekResponse(message);
    }
})

function balekResponse(message) {
    const random = Math.random();
    if (random < 0.5) {
        message.reply('https://media.tenor.com/8Ne_GzdBcikAAAAC/les-artisans-rotisseurs-palmashow.gif');
    } else {
        message.reply('https://tenor.com/view/menbalek-m-en-fou-listen-gif-17309847');
    }
}

function sendFood(message) {
    let split = message.split(' ');
    if  (split.length === 3) {
        let ville = split[2];
        message.reply(foodRequest.getFood(ville));
    } else {
        message.reply('Erreur de syntaxe, la commande est : b! food <ville>');
    }
}
function sendWeather(message) {
    let split = message.split(' ');
    if  (split.length === 3) {
        let ville = split[2];
        meteoRequest.getWeather(ville).then((meteo) => {
            message.reply('Il fait un temps ' + meteo.weather[0].description + ' à ' + ville + ' avec une température de ' + meteo.main.temp + '°C');
        });
    } else {
        message.reply('Erreur de syntaxe, la commande est : b! meteo <ville>');
    }
}

function sendSpotifyLinkWithYoutubeId(message, youtubeId) {
    youtubeRequest.getVideoTitle(youtubeId).then(title => {
        spotifyRequest.getSongUrl(title).then(url => {
            message.reply(url).then();
        });
    });
}

client.login(process.env.DISCORD_TOKEN)
