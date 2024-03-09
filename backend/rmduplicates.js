const db = require('./db/index.js');
const dotenv = require('dotenv');
dotenv.config();

const PostModel = require('./models/post');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

console.log('Connecting to db...');
db.connect().then(() => {
  console.log('Done.');

  var numDeleted = 0;
  PostModel.find({}).sort({numUpvotes:'desc'}).then((posts) => {
    //console.log(posts);
    posts.forEach(function(doc){
      //remove posts with same title and less or equal upvotes
      PostModel.find({
        numUpvotes:{$lte:doc.numUpvotes}, 
        title:doc.title, _id:{$ne:doc._id}
      }).then((post) => console.log(post));
      PostModel.deleteMany({
        numUpvotes:{$lte:doc.numUpvotes},
        title:doc.title, _id:{$ne:doc._id}
      }).then((d => {numDeleted += d.deletedCount}));
    });
  });

  delay(5000).then(() =>{
    console.log(`removed ${numDeleted} posts.`);
    db.close();
  });
});

