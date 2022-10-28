const {ChatInputCommandInteraction, SlashCommandBuilder} = require('discord.js');
const {ConnectionPool} = require('mssql');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!')
        .addBooleanOption(option =>
            option.setName('time')
            .setDescription('Shows the time the command took to respond')),
    
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {ConnectionPool} con
     */
    async execute(interaction, con) {

        if (!con) {
            interaction.reply({content: 'Well, the bot\'s working, but the database isn\'t... so... sad pong?'});
            return;
        }

        if (interaction.options.getBoolean('time')) {
            // Some time loging I don't want to implement
            interaction.reply({content: 'Hah you thought I\'d actually bother to implement this!'});
        } else {
            interaction.reply({content: 'Pong!'});
        }
    },
    permissions: 'all'
}