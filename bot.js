const Discord = require('discord.js');
const RichEmbed = require('discord.js').RichEmbed;
const client = new Discord.Client();
const rp = require('request-promise');

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var urlregex = new RegExp(expression);

const BOT_KEY = require("./secrets.js").BOT_KEY();
const TUMBLR_API_KEY = require("./secrets.js").TUMBLR_API_KEY()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  
  // ONLY RESPOND TO OTHER USERS, DIPSHIT
  if (msg.author.id !== client.user.id){
    
    // URL ACTIONS
    if (msg.content.match(urlregex)){
      var url = urlregex.exec(msg.content)[0];
      if (url.includes("tumblr") && !url.includes("media")){
        tumblrLink(url, msg);
      }
      if (url.includes("twitter")){
        if (msg.author.id === "87562842047279104"){
          twitterLink(url, msg);
        }
      }
    }
  }
});

function tumblrLink(url, msg){
  const blog = url.substring(url.indexOf("//") +2, url.indexOf(".tumblr.com"));
  const post = url.substring(url.indexOf("post/") +5, url.lastIndexOf("/"));
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
      if (json.meta.x_tumblr_content_rating === "adult"){
        var blogname = json.response.blog.name;
        var summary = json.response.posts[0].summary;
        var attachments = [];
        if (json.response.posts[0].type === "photo"){
          json.response.posts[0].photos.forEach(function(photo){
            attachments.push(photo.original_size.url);
          });              
        }
        if (json.response.posts[0].type === "video"){
          attachments.push(json.response.posts[0].video_url);    
        }
        if (json.response.posts[0].type === "text"){
          var images = json.response.posts[0].body.split("<img");
          images.shift();
          images.forEach((img) => {
            var image = img.split("\" data-orig")[0].replace("src=\"", "").replace(/^\s+|\s+$/g, '').replace("_540", "_1280");
            attachments.push(image);
          })
        }        
        
        const embed = new RichEmbed()
          .setTitle(blogname)
          .setColor(0xFF0000)
          .setDescription(summary)
          .attachFiles(attachments);
        msg.channel.send(embed);        
      }
  })
  .catch((err) => {
    console.log(err);
  })
}

function twitterLink(url, msg) {
  console.log("Yo");
}

console.log("Loggin' in...");
client.login(BOT_KEY);