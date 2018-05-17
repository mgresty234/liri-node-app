var request = require("dotenv").config();
var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var omdb = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var task = process.argv[2];
var taskTwo = process.argv[3];


switch(task){
    case 'spotify-this-song':    
    var song = process.argv.slice(3).join(' ');
    spotifySearch(song);
    break;

    case 'my-tweets':
    var tweet = process.argv[3];
    twitterSearch();
    break;

    case 'movie-this':
    movieSearch();
    break;

    default:
        console.log("Sorry we don't know " + task);

   

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
    var params = { screen_name: 'Matt07217979' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (obj in tweets){
                console.log(tweets[obj].text);
            }
            
        }
    });
}
function movieSearch(){
    omdb('http://www.omdbapi.com/?t=' + taskTwo + '&apikey=trilogy',  function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
}
 //Make so liri can take in the following commands:
 //`my-tweets`, `spotify-this-song`
