/*
Get the top 10 posts from r/electricvehicles in the past day,
convert it to a mongoose schema, then insert into database.
No duplicate checking, eventually will be set to run on a
scheduled timer.
*/

const mongoose = require('mongoose');
const snoowrap = require('snoowrap');
const db = require('./db/index.js');
const dotenv = require('dotenv');
const Sentiment = require('sentiment');
dotenv.config();

const sentiment = new Sentiment();

// hi backend
const PostModel = require('./models/post');


const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDDIT_USERNAME,
  REDDIT_PASSWORD,
} = process.env;

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
// eslint-disable-next-line new-cap
const r = new snoowrap({
  // moved to .env
  userAgent: 'e-vehicle',
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  username: REDDIT_USERNAME,
  password: REDDIT_PASSWORD,
});

// I don't know how to make it wait properly until 10 posts are saved
// using this instead
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Wrapper for API call
 * @param {string} time The time range for posts: day, week, etc.
 * @param {number} limit The number of posts to get
 */
async function getEVPosts(time, limit) {
  let numSaved = 0;

  console.log('Calling Reddit API...');
  r.getSubreddit('electricvehicles').getTop({time: time, limit: limit}).then((posts) => {
    console.log('Done.');
    console.log('Saving posts...');

    // save each post to database
    posts.map((post) => {
      const result = sentiment.analyze(post.title);
      const newPost = new PostModel({
        _id: new mongoose.Types.ObjectId(),
        title: post.title,
        link: 'https://reddit.com' + post.permalink,
        numUpvotes: post.ups,
        datePosted: new Date(post.created_utc * 1000), // created_utc is unix epoch time in seconds, date needs milliseconds
        source: 'Reddit',
        sentiment: result.score,
      });

      try {
        newPost.save()
            .then(() => {
              numSaved++;
              console.log(`Saved ${numSaved} posts`);
            })
            .catch((e) => console.log(e));
      } catch (err) {
        console.error(err.message);
      }
    });
  });

  await delay(60000); // wait 60 seconds
  return;
}

console.log('Connecting to db...');
db.connect().then(() => {
  console.log('Done.');

  getEVPosts('day', 10).then(() => {
    console.log('Done');
    console.log('Closing database connection...');
    db.close();
  });
});

