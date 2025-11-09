const { SlashCommandBuilder } = require('@discordjs/builders');

function positive_condition(){
    var positive_conditions = [
        "You get infinite knives",
        "You can walk on any liquid more viscous than water",
        "You get a chocolate bar for free whenever you want",
        "Lizards taste really good to you",
        "You can hover 2 inches above the ground",
        "All animals see you as the same species as themselves",
        "All poisons are 60% less effective on you",
        "You can increase the weight of anything by exactly 1kg",
        "Sharks have boobs now",
        "You can teleport once a week, up to 300km",
        "You can turn about 30-40% transparent",
        "You can perfectly recall other people's memories",
        "You always own an air fryer",
        "Your teeth are impervious to cavities and temperature",
        "You can shoot cars with your awesome brain beams",
        "You get one free Pop-Tart every 12 hours",
        "Public restrooms are always spotless for you",
        "The elderly are at your every command",
        "When you sneeze you get $3",
        "You become 30% better at things that are 'epic'",
        "Price stickers on merchandise no longer tear or leave sticky residue",
        "You can wipe yourself in 10 seconds perfectly every time",
        "You get really cool dragon eyes"
    ];
    
    return positive_conditions[getRandomInt(positive_conditions.length -1)];
}

function negative_condition(){
    negative_conditions = [
        "you have to eat at least one asparagus a day or you die",
        "you have to do a 360 degree turn every time you enter a bathroom",
        "you get a new wart every time",
        "priests can read your thoughts",
        "you can hear the farts of every person around you",
        "you have to be holding a large rock (~10 kg)",
        "you feel kind of dizzy for 3 minutes every day at a random time",
        "you audibly moan any time you hear a Weezer song (5 minute cooldown)",
        "all horses within 1 kilometer of you will stare in your direction",
        "porn becomes illegal",
        "all liquids taste like tap water to you",
        "you can't wear hats anymore",
        "people taller than you sound like they're talking backwards",
        "people think you're further away than you actually are",
        "you always have to explain jokes",
        "your hands always smell like you touched a stinky metallic doorknob",
        "you have to fist-pump any time someone compliments you",
        "your brain is reprogrammed to crave bark and critters",
        "gnomes become real",
        "7x a month a fart noise will randomly, loudly play from your location",
        "little green guys want your keys",
        "you have to watch every new Marvel movie or show"
    ]

    return negative_conditions[getRandomInt(negative_conditions.length -1)];
}

function prefix(){
    prefixes = [
        "What would you do "
    ];

    return prefixes[getRandomInt(prefixes.length -1)];
}

function hypothetical(){
    return (positive_condition() + " but " + negative_condition());
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hypothetical')
        .setDescription("What would you do..."),
    async execute(interaction) {
      var action = interaction.options.getString('action');
      await interaction.reply(hypothetical());
    },
};