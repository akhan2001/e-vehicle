export default function getAPIBaseUrl() {
  let apiUrl = "";

  console.log(
    `REACT_APP_SERVER_BASE: ${process.env.REACT_APP_SERVER_BASE} + REACT_APP_SERVER_PORT: ${process.env.REACT_APP_SERVER_PORT}`
  );

  if (
    !process.env.REACT_APP_SERVER_BASE &&
    !process.env.REACT_APP_SERVER_PORT
  ) {
    apiUrl = "http://localhost:8080";
  } else {
    apiUrl = `/api`;
  }

  return apiUrl;
}


export async function getDisplayedPosts(afterDate) {
  let posts = [];
  const BASE_URL = getAPIBaseUrl();

  try {
    const res = await fetch(`${BASE_URL}/posts/${afterDate}`);
    const data = await res.json();
    
    if (data.posts) {
      posts = data.posts;
    }
    
  } catch (e) {
    console.error("Unable to fetch posts");
    console.log("Fetching posts from:", `${BASE_URL}/posts/${afterDate}`);
    console.error(e);
  }
  posts.sort((a, b) => b.numUpvotes - a.numUpvotes);
  return posts;
}
