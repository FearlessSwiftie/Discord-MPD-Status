const Discord = require("discord.js");
const mpd = require('mpd');

const config = require("./auth.json");

const mpdclient = mpd.connect({
    port: config.mpd.port,
    host: config.mpd.address
});

const script = new Discord.Client();

mpdclient.on("ready", () => {
    console.log("Connected to MPD.");
});

var update = 0;

mpdclient.on("system-player", () => {
    if(Date.now() > (update + (5 * 1000))) {
        updateStatus();
        update = Date.now();
    }
});

function parseSongData(info) {
    var style = "";
    if(info) {
        style = config.display;
        style = style.replace("%title%", info.Title);
        style = style.replace("%artist%", info.Artist);
        style = style.replace("%album%", info.Album);
    }
    return style.replace("[", "(").replace("]", ")");
}

function fetchCurrentSong(callback) {
    mpdclient.sendCommand(mpd.cmd("currentsong", []), function(err, msg) {
        if(err)
            throw err;
        callback(mpd.parseKeyValueMessage(msg));
    });
}

function fetchStatus(callback) {
    mpdclient.sendCommand(mpd.cmd("status", []), function(err, msg) {
        if(err)
            throw err;
         callback(mpd.parseKeyValueMessage(msg));
    });
}

function updateStatus() {
    fetchCurrentSong(song => {
        fetchStatus(npdata => {
            var nowplaying = config.defaultstatus; //this is what your status will set to when no song is playing
            if(npdata.state == "play")
                nowplaying = parseSongData(song);
            script.user.setGame(nowplaying);
            console.log("Updated your Discord status to " + nowplaying);
        });
    });
}

script.on("ready", () => {
    console.log("Logged in as " + script.user.username + " - " + script.user.id);
    updateStatus();
});

script.login(config.discord.token);
