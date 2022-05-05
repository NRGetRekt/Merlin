const config = require('../config.js')
const fetch = require('cross-fetch')
const extractUrls = require("extract-urls");

const { Constants } = require('eris')

module.exports.run = async(client, interaction) => {

    let input = interaction.data.options.find(x => x.name == 'domain').value

    let URLs = extractUrls(input)

    let domain
    if (URLs && URLs[0]) {
        domain = (new URL(URLs[0])).hostname
    } else {
        domain = input.split('/')[0]
    }

    let response = await fetch(config.api + `/check?domain=${domain}`, {
        method: 'GET',
        headers: {
            'X-Identity': config.identifier
        }
    })

    let data = await response.json()

    if (data.blocked) {
        interaction.createMessage({
            "embeds": [{
                "title": "Domain Check",
                "description": domain,
                "color": 255,
                "fields": [{
                        "name": "Blocked",
                        "value": "Yes"
                    },
                    {
                        "name": "Reason",
                        "value": data.reason || 'No reason provided'
                    }
                ]
            }]
        })
    } else {
        interaction.createMessage({
            "embeds": [{
                "title": "Domain Check",
                "description": domain,
                "color": 255,
                "fields": [{
                    "name": "Blocked",
                    "value": "No"
                }]
            }]
        })
    }

}

module.exports.options = {
    name: 'check',
    description: 'Checks if a domain is being detected',
    options: [{
        type: Constants.ApplicationCommandOptionTypes.STRING,
        name: 'domain',
        description: 'The domain to check',
        required: true
    }]
	}