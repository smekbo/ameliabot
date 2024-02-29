const { SlashCommandBuilder } = require('@discordjs/builders');

function suntzu(){
    quotes = [
        "Fortnite' is a fad.",
        "One of the things I pride myself on is that I don't cuss. It's extremely rare, but when I do it kind of adds to the character.",
        "I don't want to be a sellout.",
        "I complained a lot today. But it's not my fault.",
        "Don’t be a chubby cheeked loser like Greg. Get your @MountainDew @GameFuel Dual 2XP like the 2 Time Champion.",
        "You are not allowed to drink battery acid",
        "wow big bat ears yum yum a meal for me?",
        "when are they adding the god damn NURGLINGS!!",
        "u should look at northern canada on google earth sometime",
        "sounds like a fat load of wasted time!",
        "I dont think a taco would kill an 17th century orphan but I do think one of those 2k plus calorie oreo milkshakes would because their body would go into shock from not being able to process the concentrated caloric value due to malnutrition",
        "guoh loves not playing games",
        "discord just crashes when you have a stream open and try to do anything else",
        "this is like the British stealing from the cultures they colonized and putting those artefacts in their museums",
        "isnt the ball pool of piss a tumblr museum artefact though",
        "how could a background characters lore be dissapointing",
        "why are we not downloading dawn of the tiberium age instead of looking at the worst poster to ever use social media",
        "goodnight sloppy",
        "Im just using the power of my acute inference and deduction skills",
        "hmm I should draw one of those fake mobile game spam ads with veka in a bathing suit",
        "the piss porn universe is the setting of Urge",
        "see the difference is you mean it only semi literally, whereas I mean what I said 100% literally",
        "damn, this is like having an ancient cursed toad statue that will answer any question truthfully as long as it is about something you have no use for",
        "its not the size thats the issue, its the balls being an oval",
        "guoh you are such a silly bog guy",
        "ABS (always be shitted)",
        "like her boobs are filled with lots of hot gas and they get super huge",
        "no haha don't make me blue haha",
        "sex dungeons are despite the name not very sexy",
        "when girl is embarrassed, that's when im fairest",
        "No, i don't think I've ever drawn an honest-to-god ratbat-ass aeromorph",
        "so instead of cooming he glorps out a lil xeno fetus into u?",
        "bingbar???",
        "see now that ive given you a real problem to deal with you forgot about all that other stuff",
        "bob Im harassing joe on twitter what should I tell him",
        "cuck is such a fearsome word innit",
        "wrong, its Suck N' Kuck",
        "another super goddamn good trader joes junk food discovered",
        "I don't like the fandom enough to give them content",
        "Damn my feet are cold I should put socks on",
        "i love runescape the game but it is also populated by extremely deranged people",
        "These words will make your balls cease function for a full 24 hours or your money back",
        "do NOT turn waga upside down Worst mistake of my life",
        "[mario death sound but he goes awawa]",
        "Oh gee I sure hope no horny werewolf catches me",
        "time spent playing fortnite is time spent not playing LoL",
        "In prison just thinking about cats...",
        "I intercept this dog because it is good and now it's for me",
        "I am not a master of the anime booba but I will try my best"
    ];

    return quotes[getRandomInt(quotes.length -1)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suntzu')
        .setDescription('Did he say that?'),
    async execute(interaction) {
      var action = interaction.options.getString('action');
      await interaction.reply(suntzu());
    },
};