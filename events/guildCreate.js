const colors = require('colors')
const util = require('../util/util')

module.exports = async(client, guild) => {

    process.log(`Added to guild ${colors.bold(guild.name)} | ${colors.bold(guild.id)}`)

    util.setSettings(guild.id, {
        action: 'delete',
        everyoneDetection: false
    })

};