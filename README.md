<p align="center"><img src="./logo.png" alt="Logo" width="100"></p>

# Merlin
Just Another Anti-Phishing Bot

## What's this?
Just a Discord bot that aims to keep your servers free from annoying phishing links by detecting known domains.

## Features
- Automatic detection of malicious links
- Redirection following (URL shorteners etc)
- Detect Discord login QR codes
- Choose what happens when a message is detected (delete, kick, ban)
- Report URLs
- Detect unauthorized @everyone mentions
- Fully selfhostable!
- Replit Support

## Setup
- Install [Node.JS]
- Clone the repository
- Install dependencies with ``npm install``
- Set your bot token in ``config.default.js``(create a secret if hosting on replit)
- Start the bot with ``npm start``

### Updating
By executing ``npm run update`` you can automatically pull the GitHub repo, install new dependencies, and merge new config entries all at the same time.

## Credits
Projects being used:
- [Eris](https://github.com/abalabahaha/eris)
- [Colors.JS](https://github.com/Marak/colors.js)
- [extract-urls](https://github.com/huckbit/extract-urls)
- [cross-fetch](https://github.com/lquixada/cross-fetch)
- [LevelDB](https://github.com/Level/level)
- [ms](https://github.com/vercel/ms)
- [jimp](https://github.com/oliver-moran/jimp)
- [jsqrcode](https://github.com/edi9999/jsqrcode)

External API'S:
- [phish.sinking.yachts](https://phish.sinking.yachts/docs) & [scamaway.api](https://scamaway.xenorio.xyz/docs)
