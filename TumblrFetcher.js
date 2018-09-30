const RichEmbed = require('discord.js').RichEmbed;
const rp = require('request-promise');

const secrets = require("./secrets.js");
const TUMBLR_API_KEY = secrets.TUMBLR_API_KEY()

function fetch(url, msg) {
  const blog = url.substring(url.indexOf("//") + 2, url.indexOf(".tumblr.com"));
  const post = url.substring(url.indexOf("post/") + 5, url.lastIndexOf("/"));
  const endpoint = `https://api.tumblr.com/v2/blog/${blog}.tumblr.com/posts/text?api_key=${TUMBLR_API_KEY}&notes_info=true&id=${post}`;

  console.log(endpoint);
  
  const options = {
    method: "GET",
    uri: endpoint,
    resolveWithFullResponse: true
  }

  rp(options)
    .then(($) => {
      var json = JSON.parse($.body);

      var blogname = json.response.blog.name;
      var summary = json.response.posts[0].summary;
      var attachments = [];
    
      if (json.meta.x_tumblr_content_rating === "adult"){
        msg.delete();
        summary = summary + "\n\n*Link posted by " + msg.author.username + "*";
      }    
    
      if (json.response.posts[0].type === "photo") {
        json.response.posts[0].photos.forEach(function(photo) {
          attachments.push(photo.original_size.url);
        });
      }
      if (json.response.posts[0].type === "video") {
        msg.channel.send(json.response.posts[0].video_url);
        msg.channel.send(new RichEmbed()
          .setTitle(blogname)
          .setColor(0xFF0000)
          .setDescription(summary));
      }
      if (json.response.posts[0].type === "text") {
        var images = json.response.posts[0].body.split("<img");
        images.shift();
        images.forEach((img) => {
          var image = img.split("\" data-orig")[0].replace("src=\"", "").replace(/^\s+|\s+$/g, '').replace("_540", "_1280");
          attachments.push(image);
        })
      }

      if (json.meta.x_tumblr_content_rating !== "adult" && json.response.posts[0].type === "photo") {
        attachments.shift();
      }

      if (attachments.length !== 0){
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