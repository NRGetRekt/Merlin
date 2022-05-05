const fs = require('fs')
const colors = require('colors')
const { log } = require('./util')
const config = require('../config')

let commands = {}

module.exports.load = async(client) => {

    log('Loading commands')

    let commandOptions = []
    let devCommandOptions = []

    commands = {}

    // Get all file names in commands dir
    await fs.readdir('./commands/', (err, files) => {

        if (err) {
            log('Unable to load commands. ' + err.message, 'ERROR')
            process.exit()
        }

        files.forEach(file => {

            // Ignore non-js files
            if (!file.endsWith('.js')) return

            // Parse command name from file name
            let name = file.split('.')[0]

            // Load command
            let command = require(`../commands/${file}`)

            // Add command to commands object
            commands[name] = command

            if (command.devGuildOnly) {
                devCommandOptions.push(command.options)
            } else {
                commandOptions.push(command.options)
            }

            log(`Loaded command ${colors.bold(name)} successfully`)

        })

        client.bulkEditCommands(commandOptions)
        if (config.devGuild) client.bulkEditGuildCommands(config.devGuild, devCommandOptions)

    })
}

module.exports.get = (name) => {
    if (commands[name]) {
        return commands[name]
    } else {
        return null
    }
}