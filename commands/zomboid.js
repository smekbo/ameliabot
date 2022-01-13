const { SlashCommandBuilder } = require('@discordjs/builders');
const { exec } = require("child_process");

function zomboid(action){
    switch (action) {
        case 'stop':
            stop();
            return 'Stopping Zomboid server...';

        case 'restart':
            restart();
            return 'Restarting Zomboid server...';

        default:
            break;
    }
}

function start(){
    var command = exec('./scripts/zomboid_start.sh');
}

function stop(){
    var command = exec('./scripts/zomboid_stop.sh');
}

function restart(){
    var command = exec('./scripts/zomboid_restart.sh');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('zomboid')
        .setDescription('Control Zomboid server')
        .addStringOption(option => 
            option.setName('action')
                .setDescription('stop | restart')
                .setRequired(true)),
    async execute(interaction) {
      var action = interaction.options.getString('action');
      await interaction.reply(zomboid(action));
    },
};