

export default function updatePosts(posts, postNum, postApi){
    var postsVisible = posts;
    if(postApi === "Reddit"){
      postsVisible = postsVisible.filter(post => post.source === "Reddit");
    }
    else if(postApi === "Twitter"){
      postsVisible = postsVisible.filter(post => post.source === "Twitter");
    }
    postsVisible = postsVisible.slice(0, postNum);
    return postsVisible;
  }