const config = require('../config.js')
const fetch = require('cross-fetch')

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    if (interaction.guildID != config.devGuild) {
        interaction.createMessage({ content: 'This guild is not allowed to use administrative commands!', flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    if (!interaction.member.permissions.has('administrator')) {
        interaction.createMessage({ content: "Only administrators are allowed to use this!", flags: Constants.MessageFlags.EPHEMERAL })
        return
    }

    let domain = interaction.data.options.find(x => x.name == 'domain').value

    fetch(config.api + '/remove', {
        method: 'POST',
        headers: {
            'X-Identity': config.identifier,
            'Content-Type': 'application/json',
            'Authorization': config.apiKey
        },
        body: JSON.stringify({
            domain: domain
        })
    })

    interaction.createMessage({ content: `Removed **${domain}** from blocklist`, flags: Constants.MessageFlags.EPHEMERAL })

}

module.exports.devGuildOnly = true

module.exports.options = {
    name: 'remove',
    description: 'Remove a domain from the blocklist',
    options: [{
        type: Constants.ApplicationCommandOptionTypes.STRING,
        name: 'domain',
        description: 'The domain to remove',
        required: true
    }]
}