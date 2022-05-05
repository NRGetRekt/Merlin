const fetch = require('cross-fetch')
const config = require('../config')
const { log } = require('./util')

let whitelist = []

module.exports.load = async() => {
    let res = await fetch(config.api + '/whitelist', {
        method: 'GET',
        headers: {
            'X-Identity': config.identifier
        }
    })
    whitelist = await res.json()
    log('Loaded whitelist')
}

module.exports.check = (domain) => {
    return whitelist.find(x => domain == x.domain || domain.endsWith('.' + x.domain))
}