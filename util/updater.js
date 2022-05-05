const fs = require('fs')

let currentConfig = require('../config')
let defaultConfig = require('../config.default')

let configModified = false

// Merge new config entries
for (let field in defaultConfig) {
    let value = defaultConfig[field]
    if (!currentConfig[field]) {
        console.log(`Adding "${field}" config entry...`)
        currentConfig[field] = value
        configModified = true
    }
}

// Save modified config
if (configModified) {
    console.log(`The configuration has been modified!`)
    fs.writeFileSync('./config.js', `module.exports = ${JSON.stringify(currentConfig, null, 2)}`)
}