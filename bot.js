const Discord = require('discord.js');
const RichEmbed = require('discord.js').RichEmbed;
const client = new Discord.Client();

const tumblrFetcher = require('./TumblrFetcher.js');
const twitterFetcher = require('./TwitterFetcher.js');

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var urlregex = new RegExp(expression);

const secrets = require("./secrets.js");
const BOT_KEY = secrets.BOT_KEY();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  // DON'T TALK TO YOURSELF
  if (msg.author.id !== client.user.id) {
    
    // BOB ACTIONS
    if (msg.author.id === "87562842047279104") {
      if (msg.content === 'ping') {
        var guildlist = ""
        client.guilds.forEach((guild) => {
          guildlist = guild.name + " ";
        })
        msg.channel.send(guildlist);
      }
    }
    
    // URL ACTIONS
    if (msg.content.match(urlregex)) {
      var url = urlregex.exec(msg.content)[0];
      if (url.includes("tumblr") && !url.includes("media") && url.includes("post")) {
        tumblrFetcher.fetch(url, msg);
      }
      if (url.includes("twitter")) {
        twitterFetcher.fetch(url, msg);
      }
    }
  }
});

client.on('error', (err) => {
  console.log("WEBSOCKET ERROR: " + err);
});

console.log("Loggin' in...");
client.login(BOT_KEY);