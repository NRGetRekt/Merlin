const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {
    if (!interaction.member.permissions.has('manageChannels')) {
        interaction.createMessage({ content: "Only administrators are allowed to change settings!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }
    interaction.createMessage({
        flags: Constants.MessageFlags.EPHEMERAL,
        content: 'Select what should happen when phishing is detected',
        components: [{
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [{
                custom_id: 'action-command-menu',
                type: Constants.ComponentTypes.SELECT_MENU,
                options: [{
                        label: 'Nothing',
                        description: 'Do nothing. In case you only want to use the log feature.',
                        value: 'nothing'
                    },
                    {
                        label: 'Delete',
                        description: 'Just delete the message',
                        value: 'delete'
                    },
                    {
                        label: 'Delete & Kick',
                        description: 'Delete the message and kick the author',
                        value: 'kick'
                    },
                    {
                        label: 'Delete & Ban',
                        description: 'Delete the message and ban the author',
                        value: 'ban'
                    }
                ]
            }]
        }]
    })

}

module.exports.options = {
    name: 'action',
    description: 'Choose what happens when phishing is detected'
}