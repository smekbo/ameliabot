const RichEmbed = require('discord.js').RichEmbed;
const rp = require('request-promise');

const secrets = require("./secrets.js");
const TUMBLR_API_KEY = secrets.TUMBLR_API_KEY()

const MAX_IMAGES = 3;

function fetch(url, msg) {
  var postRegex = new RegExp(/post\/([^\D]*)/gm);
  var blogRegex = new RegExp(/(https*:\/\/)*(.*)\.tumblr.com/gi)
  var post = postRegex.exec(url)[1];
  var blog = blogRegex.exec(url)[2];
  var endpoint = `https://api.tumblr.com/v2/blog/${blog}.tumblr.com/posts/text?api_key=${TUMBLR_API_KEY}&notes_info=true&id=${post}`;

  console.log(endpoint);
  
  const options = {
    method: "GET",
    uri: endpoint,
    resolveWithFullResponse: true
  }

  rp(options)
    .then(($) => {
      var json = JSON.parse($.body);

      var post = json.response.posts[0];
      var blogname = json.response.blog.name;
      var summary = post.summary;
      var rating = json.meta.x_tumblr_content_rating;
      var attachments = [];
    
      // Try deleting the useless tumblr blurb embed you get 
      //   when you post an adult link, if you have permission
      if (rating === "adult"){
        //msg.delete();
        //summary = summary + "\n\n*Link posted by " + msg.author.username + "*";
      }    
    
      if (post.type === "photo") {
        post.photos.forEach(function(photo) {
          attachments.push(photo.original_size.url);
        });
      }
      if (post.type === "video") {
        msg.channel.send(post.video_url);
        msg.channel.send(new RichEmbed()
          .setTitle(blogname)
          .setColor(0xFF0000)
          .setDescription(summary));
      }
      if (post.type === "text") {
        var images = post.body.split("<img");
        images.shift();
        images.forEach((img) => {
          var image = img.split("\" data-orig")[0].replace("src=\"", "").replace(/^\s+|\s+$/g, '').replace("_540", "_1280");
          attachments.push(image);
        })
      }
      if (post.type === "audio") {
        attachments.push(post.audio_url + ".mp3");
      }

      // If it's a SFW post, remove the first attachment, 
      //   since that will have been embedded by discord
      //   ( it seems that discord fixed the nsfw posts
      //     not being fetched, so I removed the nsfw exception )
      if (post.type !== "video" && post.type !== "audio") {
        attachments.shift();
      }

      if (attachments.length > MAX_IMAGES){
        var remove = attachments.length - MAX_IMAGES;
        var x = 0;
        while (x < remove){
          attachments.pop()
          x = x+1;
        }
        summary = summary + "\n\n*( " + remove + " more images in post )*";
      }
    
      // Don't send anything if you don't have any attachments to embed.
      if (( attachments.length > 0 )){
        const embed = new RichEmbed()
          .setTitle(blogname)
          .setColor(0xFF0000)
          .setDescription(summary)
          .attachFiles(attachments);
        msg.channel.send(embed);        
      }
    })
    .catch((err) => {
      console.log("ERROR:");
      console.log("MESSAGE: " + err.message);
      console.log("URL: " + url);
    })
}

module.exports = {
  fetch: fetch
}