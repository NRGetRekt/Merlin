const QrCode = require('qrcode-reader')
const jimp = require('jimp')
const fetch = require('cross-fetch')

module.exports.check = async(message, settings) => {

    message.attachments.forEach(attachment => {
        if (!attachment.content_type.startsWith('image')) return // Ignore non-image attachments

        jimp.read(attachment.url, (err, image) => { // Reads image as a buffer from the image URL
            if (err) {
                return
            }

            let qr = new QrCode()

            qr.callback = function(err, value) { // Gets called when QR detection is finished
                if (err) { // No QR code found
                    return
                }

                let data = value.result // String encoded in the code

                if (typeof data == "string" && data.startsWith('https://discord.com/ra/')) { // URLs encoded in login QR codes start with this (+ a token)
                    detect(message, settings)
                }

            }

            qr.decode(image.bitmap) // Read the QR code

        })

    })

}

let detect = (message, settings) => {
    if (settings.logHook) {
        fetch(settings.logHook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "embeds": [{
                    "title": "Login QR Code Detected",
                    "description": message.content,
                    "color": 16711680,
                    "timestamp": new Date().toISOString(),
                    "author": {
                        "name": `${message.author.username}#${message.author.discriminator}`,
                        "icon_url": message.author.avatarURL
                    },
                    "fields": [
                        {
                            "name": "Note",
                            "value": "For technical reasons, i can't show you the image itself"
                        }
                    ]
                }]
            })
        })
    }

    if (settings.action == "nothing") return

    message.delete().catch(err => {})

    switch (settings.action) {
        case "kick":
            message.member.kick("Login QR code detected!").catch((err) => { process.log(err.message, 'ERROR') })
            break;

        case "ban":
            message.member.ban(0, "Login QR code detected!").catch((err) => { process.log(err.message, 'ERROR') })
            break;

        default:
            break;
    }
}
