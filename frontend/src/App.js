import "./styles/App.css";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart";
import Posts from "./components/Posts";
import Wordcloud from "./components/Wordcloud";

import { getDisplayedPosts } from "./utils/api";
import updatePosts from "./utils/updatePosts";

Chart.register(CategoryScale);

function App() {

  const [posts, setPosts] = useState([]);
  const [numPosts, setNumPosts] = useState(36);
  const [apiChoice, setApiChoice] = useState("Both");
  useEffect(() => {
    getDisplayedPosts('2023-01-01').then((allPosts) => setPosts(allPosts));
    getDisplayedPosts('2023-01-01').then((allPosts) => console.log(allPosts));
  }, []);

  function handleApiChange(event){
    setApiChoice(event.target.value);
  }

  function handleDateChange(event){
    var date = new Date();
    //current date minus selected interval
    if (event.target.value === "all"){
      date.setDate("2000-01-01");
    }
    else date.setDate(date.getDate() - event.target.value);
    console.log(date);
    getDisplayedPosts(date).then((allPosts) => setPosts(allPosts));
    getDisplayedPosts(date).then((allPosts) => console.log(allPosts));
  }

  return (
    <div className="app">
      <div className="boxTitle">
        <div className="pie-charts" style={{backgroundColor: "#ECECEC"}}>
          <PieChart posts={updatePosts(updatePosts(posts, numPosts, apiChoice), numPosts, "Reddit")} title={"Reddit Post Sentiment"}/>
          <PieChart posts={updatePosts(updatePosts(posts, numPosts, apiChoice), numPosts, "Twitter")} title={"Twitter Post Sentiment"}/>
          <PieChart posts={updatePosts(updatePosts(posts, numPosts, apiChoice), numPosts, "Both")} title={"Overall Post Sentiment"}/>
        </div>
        <Wordcloud posts={updatePosts(posts, numPosts, apiChoice)}/>
        <select className="numberpostsbox" id="postsvisible" defaultValue="0" onChange={() => setNumPosts(changeNumberOfPosts)}>
          <option className="optionsbox" value="0" disabled="disabled"># of Posts</option>
          <option className="optionsbox" value="9">9</option>
          <option className="optionsbox" value="18">18</option>
          <option className="optionsbox" value="27">27</option>
          <option className="optionsbox" value="36">36</option>
        </select>
        <select className="apiChooseBox" id="apiVisible" defaultValue="Reddit and Twitter" onChange={handleApiChange}>
          <option className="optionsbox" value="Reddit and Twitter" disabled="disabled">Reddit and/or Twitter</option>
          <option className="optionsbox" value="Reddit">Reddit</option>
          <option className="optionsbox" value="Twitter">Twitter</option>
          <option className="optionsbox" value="Both">Both</option>
        </select>
        <select className="dateRangeBox" id="dateVisible" defaultValue="all" onChange={handleDateChange}>
          <option className="optionsbox" value="all" disabled="disabled">Post By Date</option>
          <option className="optionsbox" value="1">a day ago</option>
          <option className="optionsbox" value="7">a week ago</option>
          <option className="optionsbox" value="30">a month ago</option>
          <option className="optionsbox" value="30">Anytime</option>
        </select>
      </div>

      <div className="middlebox">
        <Posts posts= {updatePosts(posts, numPosts, apiChoice)}/>
      </div>

    </div>
  );
}

function changeNumberOfPosts(){
  return document.getElementById("postsvisible").value;
}



export default App;
