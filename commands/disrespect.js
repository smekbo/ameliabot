const { SlashCommandBuilder } = require('@discordjs/builders');

function disrespect(){
    quotes = [
        "If you play 'Fortnite' and you're over the age of 13 years old, you've got a psychological problem. There's something wrong with you.",
        "I am a 'Halo' god.",
        "2020 is going to be a defining year for streamers.",
        "Fortnite' is a fad.",
        "I really don't like to talk about my financial situation live on stream.",
        "With Mtn Dew Game Fuel, I'm flying off buildings and hitting 360 snipes with more precision than ever.",
        "One of the things I pride myself on is that I don't cuss. It's extremely rare, but when I do it kind of adds to the character.",
        "I don't want to be a sellout.",
        "I've always wanted a movie where the bad guy came out on top. It would shock the world.",
        "Only ROCCAT's sleek, precision-engineered gaming devices can meet my exact demands for the premiere tools necessary to dominate my competition.",
        "I created a character who plays multiplayer video games, and he's considered the most dominating gaming specimen.",
        "Gaming related content will redefine entertainment and I am looking forward to leading the way.",
        "I want Dr to be sort of the next Batman. I want to be 70, 80 years old and want someone else to play Dr Disrespect.",
        "What an absolute snoozefest it's been. Thankfully I'm here. Thankfully I'm on a whole other fucking level.  Boom boom boom... boom boom...",
        "Do you ever stare at your reflection from a gold trophy? There’s something special about it.",
        "Cheating in Halo is a scary thing to think about.",
        "I complained a lot today. But it's not my fault.",
        "The fact that I have a $300,000 PC that does nothing against aim assist blows my mind.",
        "Don’t be a chubby cheeked loser like Greg. Get your @MountainDew @GameFuel Dual 2XP like the 2 Time Champion.",
        "Gaming at its finest... me.",
        "You are not allowed to drink battery acid"
    ];

    return quotes[getRandomInt(quotes.length -1)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disrespect')
        .setDescription('Wisdom from the Man himself'),
    async execute(interaction) {
      var action = interaction.options.getString('action');
      await interaction.reply(disrespect());
    },
};