const util = require('../util/util')

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    let guild = client.guilds.get(interaction.guildID)

    if (!interaction.member.permissions.has('manageChannels')) {
        interaction.createMessage({ content: "Only administrators are allowed to change settings!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    let channel = client.guilds.get(interaction.guildID).channels.get(interaction.data.options.find(x => x.name == 'log-channel').value)

    if (!guild.permissionsOf(client.user.id).has('manageWebhooks') || !guild.permissionsOf(client.user.id).has('viewChannel')) {
        interaction.createMessage({ content: "I don't have the required permission to create webhooks in that channel!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    util.createLogHook(channel, async hook => {

        let settings = await util.getSettings(interaction.guildID)

        settings.logHook = hook
        if (settings.logs) delete settings.logs

        util.setSettings(interaction.guildID, settings)

        interaction.createMessage({ content: 'Settings saved!', flags: Constants.MessageFlags.EPHEMERAL })

    })

}

module.exports.options = {
    name: 'log',
    description: 'Set up logging',
    options: [{
        type: Constants.ApplicationCommandOptionTypes.CHANNEL,
        name: 'log-channel',
        description: 'Channel for logging',
        required: true,
        channel_types: [Constants.ChannelTypes.GUILD_TEXT, Constants.ChannelTypes.GUILD_NEWS]
    }]
}