const config = require('../config.js')
const fetch = require('cross-fetch')

module.exports.run = async(client, interaction) => {

    let response = await fetch(config.api + `/stats`, {
        method: 'GET',
        headers: {
            'X-Identity': config.identifier
        }
    })

    let data = await response.json()

    let top = ''

    let detectionList = []

    for (let domain in data.detectionList) {
        detectionList.push({
            domain: domain,
            count: data.detectionList[domain]
        })
    }

    detectionList.sort((a, b) => {
        return b.count - a.count
    })

    for (let i = 0; i < 5; i++) {
        if (detectionList[i]) top += `${i + 1} | **${detectionList[i].domain}** | **${detectionList[i].count}**\n`
    }

    if (top == '') top = 'None' //Prevent errors because of empty embeds

    interaction.createMessage({
        "embeds": [{
            "title": "Statistics",
            "color": 255,
            "fields": [{
                    "name": "Blocklist Size",
                    "value": `**${data.domains}**`
                },
                {
                    "name": "Detected/Checked Links",
                    "value": `**${data.detections}**/**${data.checks}**`
                },
                {
                    "name": "Top Detections",
                    "value": `${top}`
                }
            ]
        }]
    })


}

module.exports.options = {
    name: 'stats',
    description: 'Bot statistics'
}