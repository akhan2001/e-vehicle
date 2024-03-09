const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const db = require('./db/index.js');
const Sentiment = require('sentiment');
dotenv.config();

const sentiment = new Sentiment();

const PostModel = require('./models/post');

const {
  RAPID_KEY,
  RAPID_HOST,
} = process.env;

const options = {
  method: 'GET',
  url: 'https://twitter154.p.rapidapi.com/hashtag/hashtag',
  params: {hashtag: '#ElectricVehicles', limit: '10', section: 'top'},
  headers: {
    'X-RapidAPI-Key': RAPID_KEY,
    'X-RapidAPI-Host': RAPID_HOST,
  },
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Wrapper for API call
 */
async function getEVTweets() {
  axios.request(options).then(function(response) {
    response.data.results.map((post) => {
      const splitString = post.text.split("https://");
      const newTitle = splitString[0].substr(0, 174);
      const result = sentiment.analyze(newTitle);
      const newPost = new PostModel({
        _id: new mongoose.Types.ObjectId(),
        title: newTitle,
        link: 'https://twitter.com/' + post.user.username + '/status/' + post.tweet_id,
        numUpvotes: post.favorite_count,
        datePosted: new Date(post.creation_date),
        source: 'Twitter',
        sentiment: result.score,
      });
      try {
        newPost.save().catch((e) => console.log(e));
      } catch (err) {
        console.error(err.message);
      }
      
    });
  }).catch(function(error) {
    console.error(error);
  });

  await delay(60000); //wait 60 seconds
  return;
}

console.log('Connecting to db...');
db.connect().then(() => {
  console.log('Done.');

  getEVTweets().then(() => {
    console.log('Done');
    console.log('Closing database connection...');
    db.close();
  });
});
