const colors = require('colors');
const fs = require('fs');
const commands = require('../util/commands')

const { Constants } = require('eris')

module.exports = async(client, interaction) => {

    // Prevent commands from DMs
    if (!interaction.guildID) {
        interaction.createMessage({ content: 'This bot can only be used directly inside guilds' })
        return
    }

    switch (interaction.type) {
        case Constants.InteractionTypes.APPLICATION_COMMAND:
            process.log(`Running command ${colors.bold(interaction.data.name)}`)
            commands.get(interaction.data.name).run(client, interaction)
            break;

        case Constants.InteractionTypes.MESSAGE_COMPONENT:
            if(!fs.existsSync(`./components/${interaction.data.custom_id}.js`)) break
            require(`../components/${interaction.data.custom_id}.js`).run(client, interaction)
            break;

        default:
            break;
    }

};