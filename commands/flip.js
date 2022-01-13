const { SlashCommandBuilder } = require('@discordjs/builders');

var result = ""

function flip(user){
  var t = Math.round(Math.random() * (2 - 1) + 1);
  if (t === 1){
    result = `**${user}** flips a coin: *Heads*`;
  }
  else {
    result = `**${user}** flips a coin: *Tails*`;
  }
  
  return result;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flips a coin'),
    async execute(interaction) {
      await interaction.reply(flip(interaction.user.username));
    },
};