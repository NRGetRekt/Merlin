const axios = require('axios').default
const config = require('../config')

module.exports.resolve = async(url) => {

    let redirects = []

    let count = 0

    // Recursively check for redirects and add hostnames to list
    let check = async(currentUrl) => {
        let res = await axios({
            method: 'GET',
            url: currentUrl,
            headers: {
                'User-Agent': config.followRedirects.useragent
            },
            maxRedirects: 0,
            validateStatus: function() { // Ignore response codes
                return true
            }
        }).catch(err => { return })

        if (res && res.status >= 300 && res.status < 400) {

            let relative = false

            try {
                redirects.push((new URL(res.headers['location'])).hostname)
            } catch (error) {
                relative = true
            }

            count += 1
            if (count > config.followRedirects.maxRedirects) return

            let nextUrl = res.headers['location']

            if (relative) {
                nextUrl = (new URL(currentUrl)).hostname + nextUrl
            }

            await check(nextUrl)
        }

    }

    await check(url)

    return redirects

}