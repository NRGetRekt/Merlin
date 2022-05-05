const colors = require('colors')
const { log } = require('../util/util')
const commands = require('../util/commands')

const config = require('../config')

let firstRun = true

module.exports = async (client) => {
    
    // Prevent firing multiple times
    if (!firstRun) return
    firstRun = false

    commands.load(client)

    client.editStatus(config.presence.status, config.presence.activities)

    log('Logged in and ready to rumble!')

    log(`Invite link: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1394254146630&scope=bot%20applications.commands`)

    // Load unknown guilds
    client.guilds.forEach(guild => {
        process.database.get(guild.id)
            .catch(() => {
                log(`Adding unknown guild ${colors.bold(guild.name)} to database`)
                process.database.put(guild.id, JSON.stringify({
                    action: 'delete',
                    everyoneDetection: false
                }))
            })
    })


};