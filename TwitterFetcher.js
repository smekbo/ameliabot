const Twitter = require('twitter');
const RichEmbed = require('discord.js').RichEmbed;
const secrets = require("./secrets.js");

function fetch(url, msg) {
  var twitter = new Twitter({
    consumer_key: secrets.TWITTER_CK(),
    consumer_secret: secrets.TWITTER_CS(),
    access_token_key: secrets.TWITTER_TK(),
    access_token_secret: secrets.TWITTER_TS()
  });  
  
  var id = url.substring(url.indexOf("status/") + 7, url.length);
  id = id.split("?")[0];
  twitter.get("statuses/show/" + id, {tweet_mode: "extended"}, (error, tweets, response) => {
    var attachments = [];
    try {
      tweets.extended_entities.media.forEach( (media) => {
        attachments.push(media.media_url);
      })

      if (attachments.length > 1){
        attachments.shift();
        const embed = new RichEmbed()
          .setTitle("(the other photos)")
          .attachFiles(attachments);
        msg.channel.send(embed);      
      }  
    }
    catch (err) {
      console.log("TWITTER ERROR: ");
      console.log(err.message);
    }
  })
}

module.exports = {
  fetch: fetch
}