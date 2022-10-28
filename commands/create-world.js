const {ChatInputCommandInteraction, SlashCommandBuilder} = require('discord.js');
const {ConnectionPool, Char, VarChar} = require('mssql');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-world')
        .setDescription('Creates a new world')
        .addStringOption(option =>
            option.setName('worldname')
                .setDescription('The name of the world being created')
                .setRequired(true)),
    
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {ConnectionPool} con
     */
    async execute(interaction, con) {

        let userId = interaction.user.id;
        let guildId = interaction.guildId;
        let worldName = interaction.options.getString('worldname');

        interaction.deferReply();

        let trans = con.transaction();
        trans.begin(async (err) => {

            if (err) {
                console.error(err);
                return; // oof
            }

            // Rollback
            let rolledBack = false;
            trans.on('rollback', (aborted) => {
                if (aborted) {
                    console.log('SQL server aborted');
                } else {
                    console.log('rolled back');
                }
                rolledBack = true;
            });

            let result = await trans.request()
                .input('HostId', Char(18), userId)
                .input('GuildId', Char(18), guildId)
                .input('WorldName', VarChar(32), worldName)
                .execute('CreateNewWorld');

            if (result.returnValue != 0) {
                // TODO: Error returned
                trans.rollback();
                let replyContent = 'A server error occurred and your world could not be created :(';
                if (result.returnValue == 3) {
                    replyContent = 'You already have a world in this server! Use /host to host your world, or /delete to delete your existing world before '
                }
                interaction.editReply({content: replyContent});
                return;
            }

            // TODO: What's next?
            
            trans.commit(err => {
                if (err) {
                    interaction.editReply({content: 'A server error occurred and your world could not be created :('});
                    return;
                }
                interaction.editReply({content: 'World Created! Use /host to start hosting your world in this server!'});
            });
        });
    }
}