const Twitter = require('twitter');
const RichEmbed = require('discord.js').RichEmbed;

function fetch(url, msg, secrets) {
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
//         const embed = new RichEmbed()
//           .setTitle("(the other photos)")
//           .attachFiles(attachments);
        uploadSync(msg, attachments, 0);
      }  
    }
    catch (err) {
      console.log("TWITTER ERROR: ");
      console.log(err.message);
    }
  })
}

function uploadSync(msg, attachments, index){
  if (index < attachments.length){
    msg.channel.send({
      files: [attachments[index]]
    })
    .then(function(value){
      index = index +1;
      uploadSync(msg, attachments, index);
    })
    .catch(console.error);  
  }
}

module.exports = {
  fetch: fetch
}