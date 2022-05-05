const fetch = require('cross-fetch')
const config = require('../config.js')
const extractUrls = require("extract-urls");

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    let input = interaction.data.options.find(x => x.name == 'url').value

    let URLs = extractUrls(input)

    if (!URLs || !URLs[0]) {
        interaction.createMessage({ content: 'Please provide the full URL (Not just the domain)', flags: 64 })
        return
    }

    URLs.forEach(url => {
        fetch(config.api + '/report', {
            method: 'POST',
            headers: {
                'X-Identity': config.identifier,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                user: `${interaction.member.username}#${interaction.member.discriminator}`
            })
        })
    })

    interaction.createMessage({ content: 'Thanks for your report!', flags: 64 })

}

module.exports.options = {
    name: 'report',
    description: 'Report a link',
    options: [{
        type: Constants.ApplicationCommandOptionTypes.STRING,
        name: 'url',
        description: 'The URL you want to report',
        required: true
    }]
}