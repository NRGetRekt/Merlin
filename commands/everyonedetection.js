const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    if (!interaction.member.permissions.has('administrator')) {
        interaction.createMessage({ content: "Only administrators are allowed to change settings!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }
    interaction.createMessage({
        flags: Constants.MessageFlags.EPHEMERAL,
        content: 'This automatically detects messages that contain an unauthorized @everyone and at least 1 link.\nLinks are automatically being reported.',
        components: [{
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [{
                custom_id: 'everyonedetection-command-menu',
                type: Constants.ComponentTypes.SELECT_MENU,
                options: [{
                        label: 'Enable',
                        description: 'Enables @everyone detection',
                        value: 'enable'
                    },
                    {
                        label: 'Disable',
                        description: 'Disables @everyone detection',
                        value: 'disable'
                    }
                ]
            }]
        }]
    })
}

module.exports.options = {
    name: 'everyonedetection',
    description: 'Choose what happens when an unauthorized @everyone is detected'
}