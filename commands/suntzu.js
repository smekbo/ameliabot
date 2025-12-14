const { SlashCommandBuilder } = require('@discordjs/builders');

let rand_hist = [];
const rand_histnum = 1;

function suntzu(){
	quotes = [
        "You are not allowed to drink battery acid",
        "wow big bat ears yum yum a meal for me?",
        "when are they adding the god damn NURGLINGS!!",
        "u should look at northern canada on google earth sometime",
        "sounds like a fat load of wasted time!",
        "I dont think a taco would kill an 17th century orphan but I do think one of those 2k plus calorie oreo milkshakes would because their body would go into shock from not being able to process the concentrated caloric value due to malnutrition",
        "discord just crashes when you have a stream open and try to do anything else",
        "this is like the British stealing from the cultures they colonized and putting those artefacts in their museums",
        "isnt the ball pool of piss a tumblr museum artefact though",
        "how could a background characters lore be dissapointing",
        "why are we not downloading dawn of the tiberium age instead of looking at the worst poster to ever use social media",
        "goodnight sloppy",
        "Im just using the power of my acute inference and deduction skills",
        "hmm I should draw one of those fake mobile game spam ads with veka in a bathing suit",
        "see the difference is you mean it only semi literally, whereas I mean what I said 100% literally",
        "damn, this is like having an ancient cursed toad statue that will answer any question truthfully as long as it is about something you have no use for",
        "its not the size thats the issue, its the balls being an oval",
        "you are such a silly bog guy",
        "ABS (always be shitted)",
        "like her boobs are filled with lots of hot gas and they get super huge",
        "sex dungeons are despite the name not very sexy",
        "when girl is embarrassed, that's when im fairest",
        "No, i don't think I've ever drawn an honest-to-god ratbat-ass aeromorph",
        "see now that ive given you a real problem to deal with you forgot about all that other stuff",
        "bob Im harassing joe on twitter what should I tell him",
        "cuck is such a fearsome word innit",
        "another super goddamn good trader joes junk food discovered",
        "I don't like the fandom enough to give them content",
        "Damn my feet are cold I should put socks on",
        "i love runescape the game but it is also populated by extremely deranged people",
        "These words will make your balls cease function for a full 24 hours or your money back",
        "do NOT turn waga upside down Worst mistake of my life",
        "Oh gee I sure hope no horny werewolf catches me",
        "time spent playing fortnite is time spent not playing LoL",
        "In prison just thinking about cats...",
        "I intercept this dog because it is good and now it's for me",
        "I am not a master of the anime booba but I will try my best",
        "a toe ring is like the choker of the foot",
	    "I dont think the body of a child would stop a nuclear missile",
        "AAAHHH LOOOK OUT AAAHH",
        "your vile spire is looking quite putrid today",
        "I doubt you would ever be able to guess what nsfw art I draw next, because honestly I dont even know most of the time. I simply get taken by an evil spirit and it happens",
        "a game funded by the russian government will never have hot slutty male characters",
        "a toe ring is like the choker of the foot",
        "I need to find a polite way to tell them this looks like ass",
        "Still mad that the Starbucks dragon drink did not tf me into a dragon",
        "Not saying this is tasteless but wow",
        "Idk I am torn between some kind of underboob crop top or a leotard",
        "Ain't no way I can put the mommy milkers squad out on display...",
        "brb gotta drill holes in  my wall",
        "If you shaved him do you think he'd look like a regular kobold or some kind of wrinkly pink hairless freak",
        "Level drains u teehee",
        "reported for being bad at video games",
        "Who would be so knavish to do such terrible things...",
        "That is the only comfort to me",
        "youve said this a lot",
        "ah, well, gomonkul scamper upon you then",
        "thats my new hot term for dry humping",
        "wow just like real life",
        "huhuh im mr been huhuh gughhh",
        "I was just flicking the god switch on and off on my god laser pointed at her house",
        "atted the wrong person award",
        "I need my coitus silver to live",
        "im trying to find a good reference image of the ship from titan A.E. for you",
        "not as cool as the ships from titan A.E.",
        "look away this slutula is too much for you to handle",
        "you cannot get death crystals from old men, death crystals only appear in dead things",
        "bob kill him",
        "plato owns your ass",
        "fuuuucckkkk hggghhhhh",
        "bro is complaining about the free aphids I put on his coli",
        "bugs are eating it now",
        "they were designed in a lab for getting pinched and pulled",
        "sergals can just do that",
        "I remember being like 12 and my dad repeatedly killing r2d2 or Yoda because he thought the sounds were funny",
        "I didnt even notice the egg flaps",
        "papa needs his shroomies",
        "superr marioooo go fuck yourself wahooo ",
        "me when my boss asks me where my mortal flesh is",
        "It needs its funko pop",
        "i need more faces of sinister enjoyment",
        "Attack",
        "hoe bug sex creatures",
        "baffling and insane kind of",
        "you probably shouldn't read too much into it",
        "I thought it was neat, but I just didn't like the two minutes of baby crying noises for the end sequence",
        "drawing porn is like getting cummed on all day or some'n, I dunno",
        "it's pronounced 'yerma' I think",
        "I'm gonna pull some strings and get gaben and toby fox in the server so we can settle this",
        "just sitting there and shootin' goo?",
        "you can be a hater at any age",
        "circumcision is worse than bombing hydroelectric dams really",
        "I can never know if people who love it are aware of butthole or not....",
        "(happy souls voice) HORSE BUT HOLE?!",
        "the game has nipples",
        "I have a breeding pair of Jade dragons now.",
        "wear a clown hat and also make your topology seen to the world",
        "God could read your mind so the only reason he would turn you into a horse was because he thinks you deserve to suffer",
		"White people don't tell you to kill yourself anymore, they just say you look like doomguy 2016",
		"I will only answer if you provide me with a lust provoking image",
		"Why not try extracting some bitches from the club",
		"it could be worse i couldve bought the $50 kirby amiibo",
		"You're going to get all of my micro plastics",
		"tch. If anyone wants me I'll be in my room. Touching my crystal.",
		"Dude I love kirby.  Is this kirby?",
		"we gotta kill shy",
		"I trust only tucker carlson",
		"its crazy that you guys let joe do this to you",
		"ah fuck you cocksucker",
		"that is fucked up and scary",
		"Told my dad I was gonna work with someone on a gator lady vrc model project next and he asked if she too had 'large pendelous breasts'",
		"none of those words even sound remotely close to cum",
		"If dinosaurs lived to experience the joys of the modern day, they would be like this :)",
		"women ceased to exist in this world",
		"I think they should replace every instance of special organ on that site with boobs",
		"Waitor? Please call me the f slur",
		"you people are too used to comfort",
		"Every time my cat sucks my finger, it sucks away one of my precious memories.  Now I can't even remember my mother's face.".
		"I hate how quickly I drink drinks like aw man I wanted to still be drinking that",
		"Friendship City Unlimited",
		"you will be made to say peepee poopoo and like it",
		"happy world egg day!",
		"no dont make me eat the hair buger",
		"there must be a limit to how many mices you can draw",
		"I smash this creature with a rock, like how Cain owned Abel",
		"we ate our cement and didnt COMPLAIN",
		"that gave me a gross idea for an enemy they could put into elden ring",
		"I saw this pop up in my 'likes' feed and I was about to share it before I saw that it was you who liked it",
		"There was a goose on one of the sidewalks I take to get to work this morning. Wouldn't move, wouldn't back down. Had to cross the street. If I had more time I'd have fought it, though",
		"I already smashed that motherfuckin' like button, but I agree",
		"Shigeru Miyamoto invented cuckolding",
		"Can i buy toxoplasmosis supplements? I've been feeling kind of timid lately",
		"I'm probably a little bit French",
		"Richelieu is to The Three Musketeers as George Washington is to Babycakes",
		"I thought those only existed in funny meme pictures",
		"Shit. Does Hardees have these? I want to try them",
		"kindling the flame is for suckers, i would simply usher in a new age of darkness",
		"i know it's not bug pussy wednesday but imagine it is",
		"its a nice shrimp, but not 'gets me banned from 20k+ person discord server' level yet",
		"god i wish worm on a string creatures with only a buttholes were real",
		"they have a single dude in a small office cubicle wearing a chasity cage who has to search out everything one by one and delete them",
		"imagine showing franz ferdinand this a day before it happened",
		"kinda fucked to think there's a creature out there with long protruding nails that picks up and eats these thing",
		"I'd say 'penis' usually beats both of those",
		"babe i cant see anymore",
		"Hold on I gotta sneeze right now I can't think",
		"Cheers, I'll drink water to that.",
		"trust me im a veiny penis expert",
		"ohhhh can i be a sexy and cute sentient goop",
		"i wonder if i have some ancient sais",
		"maybe in another life...we could have both been postmen",
		"behold a beast and its ball",
		"smelly ass nine inch nails gijinka",
		"yeah that shit chunks",
		"i wish i was green",
		"it scared me because i had no clue how to deal damage until i realized i was doing damage",
		"shitty little level 1 knife with bleed AND frost??? its purple now!!!!!",
		"birds have it so good i wish i had hollow bones",
		"I can sympathize with the modern sloptuber",
		"well folks, get suckin",
		"makes a sniffing noise when you take a pic",
		"the breasts are specifically to choke vorists",
		"summoning Pustulated Lincoln",
		"it's so they can give spikejobs",
		"I'm not willing to commit to hanging a gigantic sex kobold on my wall",
		"me looking over my larder of frightened jesters",
		"wow, even the nipples (main) are exposed",
		"you don't have to go with a tallboy, normal should be fine",
		"make sure if you try the tartcube that you wash it down with 3-4 monster energy zeros",
		"he locked that liberal up in the crystal",
		"the biters are getting BIGGER and SEXIER",
		"ah go fuck yaself ya hag kneed cocksucker",
		"its a donut that had doopi the sugar clown cum all over it",
		"did you see my epic sword",
		"What the fuck fuck this life!!!",
		"caleb energy",
		"open one of his streams with a geiger counter in hand and the amount of hitler particles radiating off of them would explode it and your computer",
		"her pipples are just blasting thru that shirt",
		"The guy who created loss would love these",
		"Never shoulda smoked that ghost blunt",
		"when you look at someone real hard, they get a double attack down debuff",
		"[dark souls font] RAT DESTROYED",
		"Women? What's that?",
		"yeah that sounds like a hunter x hunter power",
		"funny to me that the evil pedophile clown gets an awesome flamenco theme",
		"the sucking and fucking business is being sucked up by a fucker!!",
		"fucked up by suckers",
		"yeah well if i had a genie wish I'd wish that everyone had monotone hearing forever",
		"I am.. le assaultur... de sexualle...",
		"Bro still has hair?  low testosterone.",
		"The noble eagle hunts most cruelly.  If one is not the Hunter.  but the dodent.",
		"please lord send upon me a fertile yinglet female ready to breed"
		
		
		
		
		
		
		
		
		
		
		
		
		
    ];
	
	// rolls until it finds a number not in the random history 
	let to_line = 0;
	let line_in_hist = true;
	while (line_in_hist) {
		to_line = getRandomInt(quotes.length - 1);
		line_in_hist = rand_hist.includes(to_line);
	}

	// updates random history with rolls
	if (rand_hist.length < rand_histnum) { rand_hist.push(to_line) } 
	else {
		rand_hist.splice(0,1);
		rand_hist.push(to_line);
	}
	
    return quotes[to_line];
}

function getRandomInt(max) {
    return Math.round(Math.random() * max);
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
