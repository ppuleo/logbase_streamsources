var Twitter = require('twitter');
var env = require('dotenv').config().parsed;

var streamFilter = require('./streams/twitter/filters');
var streamError = require('./streams/twitter/error');
var streamKeywords = require('./streams/twitter/keywords');

var streamParameters = {
  filter_level: 'low',
  language: 'en',
  track: streamKeywords.KEYWORDS.join(',')
};

var client = new Twitter({
  consumer_key: env.twitter_consumer_key,
  consumer_secret: env.twitter_consumer_secret,
  access_token_key: env.twitter_access_token_key,
  access_token_secret: env.twitter_access_token_secret
});
client.stream('statuses/filter', streamParameters, function (stream) {
  stream.on('data', streamFilter);
  stream.on('error', streamError);
});