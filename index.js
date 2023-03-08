require('dotenv').config()


const { Client, Events, GatewayIntentBits } = require('discord.js');
const YoutubeRequest = require("./google");
const SpotifyRequest = require("./spotify");
const Meteo = require("./meteo");
const Food = require("./food");

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
    console.log(message.content)
    const quoiValue = ['quoi', 'Quoi', 'quoi ?', 'Quoi ?', 'koi', 'Koi', 'koi ?', 'Koi ?'];
    const heinValue = ['hein', 'Hein', 'hein ?', 'Hein ?'];
    const random = Math.random();
    console.log(random)
    if (message.content.startsWith(prefixFood) && !message.author.bot) {
        sendFood(message);
    } else if (message.content.startsWith(prefixMeteo) && !message.author.bot) {
        sendWeather(message);
    } else if (message.content.startsWith(prefixLong) && !message.author.bot) {
        // sendSpotifyLinkWithYoutubeId(message, message.content.slice(prefixLong.length))
    } else if (message.content.startsWith(prefixShort) && !message.author.bot) {
        // sendSpotifyLinkWithYoutubeId(message, message.content.slice(prefixShort.length))
    } else if ((quoiValue.includes(message.content) || message.content.endsWith('quoi ?') || message.content.endsWith('quoi')) && !message.author.bot) {
        message.reply('FEUR');
    } else if ((heinValue.includes(message.content) || message.content.endsWith('hein²') || message.content.endsWith('hein ?') || message.content.endsWith('hein?')) && !message.author.bot) {
        message.reply('Deux trois t\'es une oie, quatre cinq six t\'es une saucisse.');
    } else if (message.content === 'Quelle est le GOTY 2022 ?') {
        message.reply('Bah Elden Ring évidement.');
    } else if (message.content === 'Bonne nuit') {
        message.reply('Bonne nuit bébou :point_right: :point_left: ');
    } else if (random < 0.01 && !message.author.bot) {
        message.reply('https://media.tenor.com/8Ne_GzdBcikAAAAC/les-artisans-rotisseurs-palmashow.gif');
    } else if (random < 0.05 && !message.author.bot) {
        message.reply('https://tenor.com/view/menbalek-m-en-fou-listen-gif-17309847');
    }
})

function sendFood(message) {
    let split = message.content.split(' ');
    if  (split.length === 3) {
        let ville = split[2];
        message.reply(foodRequest.getFood(ville.toLowerCase()));
    } else {
        message.reply('Erreur de syntaxe, la commande est : b! food <ville>');
    }
}
function sendWeather(message) {
    let split = message.content.split(' ');
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
