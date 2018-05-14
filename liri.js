var request = require("dotenv").config();
import 'keys.js';

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Make so liri can take in one of the following commands:
// `my-tweets`, `spotify-this-song`, `movie-this`, `do-what-it-says`
