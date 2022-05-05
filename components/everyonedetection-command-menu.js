const util = require('../util/util')

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    if (!interaction.member.permissions.has('administrator')) {
        interaction.createMessage({ content: "Only administrators are allowed to change settings!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    let settings = await util.getSettings(interaction.guildID)

    switch (interaction.data.values[0]) {
        case "enable":
            settings.everyoneDetection = true
            break;

        case "disable":
            settings.everyoneDetection = false
            break;

        default:
            break;
    }

    util.setSettings(interaction.guildID, settings)

    interaction.createMessage({ content: 'Settings saved!', flags: Constants.MessageFlags.EPHEMERAL })
}