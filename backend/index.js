const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/index.js');
// var snoowrap = require('snoowrap');

const PORT = process.env.PORT || 8080;
// hi backend
console.log('Process port', process.env.PORT);
const app = express();
const PostModel = require('./models/post');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        link: post.link,
        numUpvotes: post.numUpvotes,
        datePosted: post.datePosted,
        source: post.source,
        sentiment: post.sentiment
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message: 'Failed to fetch data.'});
  }
});

// posts after a certain date
app.get('/api/posts/:after?', async (req, res) => {
  try {
    const posts = await PostModel.find({
      datePosted: {$gte: req.params.after},
    }).exec();
    res.status(200).json({
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        link: post.link,
        numUpvotes: post.numUpvotes,
        datePosted: post.datePosted,
        source: post.source,
        sentiment: post.sentiment
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message: 'Failed to fetch data.'});
  }
});


db.connect()
    .then(() => {
      app.listen(PORT, () => {
        console.log('Listening on port: ' + PORT);
      });
    });

module.exports = app;
