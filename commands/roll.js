const { SlashCommandBuilder } = require('@discordjs/builders');

function roll(diceString, user){
    var TOTAL = 0;
    var rollTracker = [];
    var operands = diceString.split(/[\+-]/);
    var operators = [];
    operators = operators.concat(diceString.match(/[\+-]/g));
    operators.unshift("+"); 
    var opIndex = 0;
  
    operands.forEach( (o) => {
      if (o.includes("d")){
        var dice_num = o.split("d")[0];
        for (var d = 0; d < dice_num; d++){
          var dice_val = o.split("d")[1];
          var roll = Math.round(Math.random() * (dice_val - 1) + 1);
          if (operators[opIndex] === "+"){
            TOTAL = TOTAL + roll;
          }
          else {
            TOTAL = TOTAL - roll;
          }
          if (dice_val === roll.toString()){
            rollTracker.push(operators[opIndex] + roll + ":boom:");   
          }
          else{
            rollTracker.push(operators[opIndex] + roll);
          }
        }
      }
      else {
        if (operators[opIndex] === "+" || opIndex === -1){
          TOTAL = TOTAL + parseInt(o);
        }
        else {
          TOTAL = TOTAL - parseInt(o);
        }
        rollTracker.push(operators[opIndex] + parseInt(o));
      }
      opIndex = opIndex + 1;
    })
  
    var result = "";

    if (isNaN(TOTAL)){
      result = `**${user}** rolls their dice off the table \n*[bad input]*`;
    }
    else{
      result = `**${user}** rolls ${diceString}: \n ${TOTAL} *[${rollTracker.toString().replace("+","").replace(/,/g, " ").replace(/\+/g, "+ ")}]*`;
      //msg.channel.send("**" + msg.author.username + "** rolls *" + diceString + "*:\n" + TOTAL + " *[" + rollTracker.toString().replace("+","").replace(/,/g, " ").replace(/\+/g, "+ ") + "]*");
      if (TOTAL == 69){
        result = result + `\n*(nice)*`;
      }    
    }

    return result;
  }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls some dice')
        .addStringOption(option => 
            option.setName('dicestring')
                .setDescription('Roll in typical dice notation: [number_of_dice]d[sides_per_die]')
                .setRequired(true)),
    async execute(interaction) {
      var diceString = interaction.options.getString('dicestring');
      var user = interaction.user.username;
      await interaction.reply(roll(diceString, user));
    },
};