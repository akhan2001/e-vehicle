import "../styles/components/Posts.css";
const Sentiment = require('sentiment');
const sent = new Sentiment();

function Posts( { posts } ) {

  posts.forEach(post => {
    if (post.sentiment === undefined) post.sentiment = sent.analyze(post.title).score;
  });

  const redditStyle = {
    color: 'white',
    'fontSize': '25px'
  };

  const tweetStyle = {
    color: '#FB4B4B',
    'fontSize': '25px'
  };

  return (
    <div className="posts">
      {posts.map((post) => {
        const postCat = post.datePosted.substr(0,10);
        var colour = "nothing"
        var sentiment = "nothing"
        if (post.sentiment < 0){
          sentiment = "Negative Sentiment";
          colour = "#FF0000"
        }
        else if (post.sentiment === 0){
          sentiment = "Neutral Sentiment";
          colour = "#FFFF00"
        }
        else if (post.sentiment > 0){
          sentiment = "Positive Sentiment";
          colour = "#00FF00"
        }

        if (post.source === 'Reddit') {
          return (
            <a key={post.id} href={post.link} className="post rpost" target="_blank" rel="noreferrer" data-testid="testr">
              <h1>{post.title}</h1>
              <h4 style={{color: colour}}>{sentiment}</h4>
              <h2><span style={redditStyle}>{"⬆ "}</span> {post.numUpvotes}</h2>
              <h3>{"Date: "}{postCat}</h3>
            </a>
          );
        } else {
          return (
            <a key={post.id} href={post.link} className="post tweet" target="_blank" rel="noreferrer" data-testid="testt">
              <h1>{post.title}</h1>
              <h4 style={{color: colour}}>{sentiment}</h4>
              <h2><span style={tweetStyle}>{"♥ "}</span> {post.numUpvotes}</h2>
              <h3>{"Date: "}{postCat}</h3>
            </a>
          );
        }
        
      })}
    </div>
  );
}

export default Posts;

