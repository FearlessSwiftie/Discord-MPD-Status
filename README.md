# Discord MPD Status
A node script which pulls the currently playing artist and song from MPD and uses it as your Discord status.

## Prerequisites:
* node.js - https://nodejs.org/en/
* discord.js - https://github.com/hydrabolt/discord.js/
* mpd - https://www.npmjs.com/package/mpd

### Installation:
* install node.js if you haven't already
* `git clone https://github.com/FearlessSwiftie/Discord-MPD-Status.git`
* run `npm install --save discord.js` and `npm install --save mpd` in the script's directory
* fetch your self token, you can find out how here: https://hydrabolt.gitbooks.io/using-discord-js/content/getting-started/creating-a-bot-account.html
* edit and rename `auth-sample.json` to `auth.json` with the appropriate values in place
* execute the script by typing `node main.js` in the script's directory

#### Options:
You can change out the display mode of your status by editing the `display` option in `auth.json`. Possible values are `%artist%`, `%title%`, and `%artist%`.
