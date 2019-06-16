const Discord = require('discord.js');
const RichEmbed = require('discord.js').RichEmbed;
const client = new Discord.Client();
const rp = require('request-promise');

const tumblrFetcher = require('./TumblrFetcher.js');
const twitterFetcher = require('./TwitterFetcher.js');
const dice = require('./dice.js');
const stats = require('./stats.js');

var secrets;

try {
  secrets = require(process.argv[2]);
  tumblrFetcher.setup(secrets);
}
catch (e) {
  throw "Bad secrets path, exiting...";
}

const BOT_KEY = secrets.BOT_KEY();
var urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
var emojiRegex = new RegExp(/:([^\s]*):/gi);
const COMMAND_SIGNS = ["!", "/", "."];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', (msg, usr) =>{
  var noMoji = new RegExp(/\w*/gi);
  if (noMoji.exec(msg._emoji.name)[0] !== ""){
    var emoji = [[usr.id, msg._emoji.name, msg.message.channel.guild.id, Date.now().toString()]];
    stats.add.emoji(emoji);
  }
})

client.on('message', msg => {
  // DON'T TALK TO YOURSELF
  if (msg.author.id !== client.user.id && msg.guild !== null) {
    
    // STAT ACTIONS
    //   Only run on certain servers for now
    
    if (msg.guild.name.includes("vicar") || (msg.guild.name.includes("bob") && msg.channel.name.includes("general"))){
      if (msg.content.match(emojiRegex)) {
        var emoji = [];
        while((result = emojiRegex.exec(msg.content)) !== null) {
          emoji.push([msg.author.id, result[1], msg.channel.guild.id, Date.now().toString()]);
        }
        stats.add.emoji(emoji)
      }
    }
    
    // BOB ACTIONS
    if (msg.author.id === "87562842047279104") {
      if (msg.content === 'ping') {
        msg.channel.send("@here");
      }
      if (msg.content === "stats"){
        stats.get.emoji(msg);
      }
      if (msg.content === "top"){
        stats.get.top(msg, "ASC");
      }
      if (msg.content === "bot"){
        stats.get.top(msg, "DESC");
      }
      if (msg.content === "hist"){
        stats.get.hist(msg);
      }      
    }
    
    // URL ACTIONS
    if (msg.content.match(urlRegex)) {
      var url = urlRegex.exec(msg.content)[0];
      
      if (msg.guild.name.includes("vicar") || (msg.guild.name.includes("bob") && msg.channel.name.includes("general"))){
        var link = [msg.author.id, url, msg.channel.guild.id, Date.now().toString()];
        stats.add.link(link);
      }
      
      // Check if you're supposed to be ignoring this link
      if (msg.content.charAt(msg.content.indexOf(url)-1) != '<'){
        if (url.includes("tumblr") && !url.includes("media") && url.includes("post")) {
          tumblrFetcher.fetch(url, msg);
        }
        if (url.includes("twitter")) {
          twitterFetcher.fetch(url, msg, secrets);
        }        
      }
      else {
        //msg.channel.send("🤐");
      }
    }
    
    // COMMANDS
    if(COMMAND_SIGNS.indexOf(msg.content.substring(0,1)) > -1){
      var command = msg.content.split(" ")[0].substring(1);
      var params = msg.content.split(" ");
      var author = msg.author;
      params.shift();
      //console.log("COMMAND: " + command + " " + params);
      var commandRegex = new RegExp(/!+/gm);
      
      if (command !== "" && !command.match(commandRegex)){
        //msg.channel.send("👏"); 
      }
      
      if (command === "roll" || command == "r"){
        if (msg.channel.name.includes("dice") || msg.guild.name.includes("bob")){
          try {
            dice.roll(params, msg, true);
          }
          catch (error) {
            console.log(error);
            msg.channel.send("nope");
          }
        }
      }
      if (command === "coin"){
        dice.flip(msg);
      }
      
    }
  } // END don't talk to self
});

client.on('error', (err) => {
  console.log("WEBSOCKET ERROR: " + err.message);
});

console.log("Loggin' in...");
client.login(BOT_KEY);