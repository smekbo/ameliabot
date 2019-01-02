const Discord = require('discord.js');
const RichEmbed = require('discord.js').RichEmbed;
const client = new Discord.Client();
const rp = require('request-promise');

const tumblrFetcher = require('./TumblrFetcher.js');
const twitterFetcher = require('./TwitterFetcher.js');

var urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

const secrets = require("./secrets.js");
const BOT_KEY = secrets.BOT_KEY();

const COMMAND_SIGNS = ["!", "/"];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  // DON'T TALK TO YOURSELF
  if (msg.author.id !== client.user.id) {
    
    // BOB ACTIONS
    if (msg.author.id === "87562842047279104") {
      if (msg.content === 'ping') {
        msg.channel.send("@here");
      }
    }
    
    // URL ACTIONS
    if (msg.content.match(urlRegex)) {
      var url = urlRegex.exec(msg.content)[0];
      
      // Check if you're supposed to be ignoring this link
      if (msg.content.charAt(msg.content.indexOf(url)-1) != '<'){
        if (url.includes("tumblr") && !url.includes("media") && url.includes("post")) {
          tumblrFetcher.fetch(url, msg);
        }
        if (url.includes("twitter")) {
          twitterFetcher.fetch(url, msg);
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
      params.shift();
      //console.log("COMMAND: " + command + " " + params);
      var commandRegex = new RegExp(/!+/gm);
      if (command !== "" && !command.match(commandRegex)){
        //msg.channel.send("👏"); 
      }
      if (command === "roll"){
        try {
          var TOTAL = 0;
          var rollTracker = [];
          var operands = params[0].split("+");
          operands.forEach( (o) => {
            if (o.includes("d")){
              var dice_num = o.split("d")[0];
              for (var d = 0; d < dice_num; d++){
                var dice_val = o.split("d")[1];
                var roll = Math.round(Math.random() * (dice_val - 1) + 1);
                TOTAL = TOTAL + roll;
                rollTracker.push(roll);                
              }
            }
            else {
              TOTAL = TOTAL + parseInt(o);
            }
          })
          msg.channel.send(TOTAL + " [" + rollTracker.toString() + "]");
        }
        catch (error) {
          console.log(error);
          msg.channel.send("nope");
      }
      }
    }
  } // END don't talk to self
});

client.on('error', (err) => {
  console.log("WEBSOCKET ERROR: " + err.message);
});

console.log("Loggin' in...");
client.login(BOT_KEY);