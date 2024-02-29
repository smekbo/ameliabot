const { SlashCommandBuilder } = require('@discordjs/builders');

function eightball(){
    responses = [
        "Yes!",
        "... sure.",
        "Uh... okay.",
        "No.",
        "Absolutely NOT!",
        "Er, maybe?",
        "I don't think so, no...",
        "Absolutely not, Weed Fiend",
        "I don't think so, you lunatic",
        "Yes but only for the next 24 hours",
        "Theoretically that should be possible",
        "Unlikely",
        "Honestly I have no idea",
        "Mmm, no, very unwise"
    ];

    return responses[getRandomInt(responses.length -1)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eightball')
        .setDescription('Magic 8-Ball'),
    async execute(interaction) {
      var action = interaction.options.getString('action');
      await interaction.reply(eightball());
    },
};