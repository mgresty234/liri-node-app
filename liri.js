var request = require("dotenv").config();
var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var task = process.argv[2];


switch(task){
    case 'spotify-this-song':    
    var song = process.argv.slice(3).join(' ');
    spotifySearch(song);
    break;
    default:
    console.log("Sorry we don't know " + task);
    case 'my-tweets':
    var tweets = process.argv[3];
    twitterSearch();
    break;
   

}

function spotifySearch(songRequest){
    spotify.search({ type: 'track', query: songRequest, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].artists[0].name);
    });
}

function twitterSearch(){
    var params = { screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}
 //Make so liri can take in the following commands:
 //`my-tweets`, `spotify-this-song`
