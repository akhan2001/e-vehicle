/* eslint-disable linebreak-style */
process.env.NODE_ENV = 'test';

const conn = require('../db/index.js');
const request = require('supertest');
const app = require('../index.js');
const expect = require('chai').expect;
const fs = require('fs');
const PostModel = require('../models/post');

describe('testing routes for /posts and /posts/:after?', () => {
  let p = 0;
  let testData;

  before((done) => {
    fs.readFile('./test/testdata.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      testData = JSON.parse(data);
    });
    conn.connect()
        .then(() => done())
        .catch((err) => done(err));
  });

  after((done) => {
    conn.close()
        .then(() => done())
        .catch((err) => done(err));
  });

  afterEach((done) => {
    const newPost = new PostModel({
      _id: testData.posts[p]._id,
      title: testData.posts[p].title,
      link: testData.posts[p].link,
      numUpvotes: testData.posts[p].numUpvotes,
      datePosted: testData.posts[p].datePosted,
    });
    newPost.save().then(() => {
      p++;
      done();
    });
  });

  it('GET when db has no posts', (done) => {
    request(app).get('/api/posts')
        .then((res) => {
          const posts = res.body.posts;
          // console.log(posts);
          expect(posts.length).to.equal(0);
          done();
        })
        .catch((err) => done(err));
  });

  it('GET when db has 1 post', (done) => {
    request(app).get('/api/posts')
        .then((res) => {
          const posts = res.body.posts;
          // console.log(posts);
          expect(posts.length).to.equal(1);
          done();
        })
        .catch((err) => done(err));
  });

  it('GET after oldest date', (done) => {
    // find older date in test data
    const olderDate = new Date(Math.min(
        new Date(testData.posts[0].datePosted),
        new Date(testData.posts[1].datePosted),
    ));
    request(app).get(`/api/posts/${olderDate}`)
        .then((res) => {
          const posts = res.body.posts;

          // should get all posts
          expect(posts.length).to.equal(p);

          // each post should be after the date specified
          posts.forEach((element) => {
            expect(new Date(element.datePosted)).to.be.at.least(olderDate);
          });
          done();
        })
        .catch((err) => done(err));
  });

  it('GET after newest date', (done) => {
    // find newest date in test data
    const newestDate = new Date(Math.max(
        new Date(testData.posts[0].datePosted),
        new Date(testData.posts[1].datePosted),
        new Date(testData.posts[2].datePosted),
    ));
    request(app).get(`/api/posts/${newestDate}`)
        .then((res) => {
          const posts = res.body.posts;

          // should only get one post
          expect(posts.length).to.equal(1);

          // each post should be after the date specified
          posts.forEach((element) => {
            expect(new Date(element.datePosted)).to.be.at.least(newestDate);
          });
          done();
        })
        .catch((err) => done(err));
  });
});

