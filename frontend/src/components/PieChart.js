import React from "react";
import { Pie } from "react-chartjs-2";
import "../styles/components/PieChart.css";
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

function PieChart({ posts, title }) {
  const score = [0, 0, 0]
  posts.forEach(post => {
    if (post.sentiment === undefined) post.sentiment = sentiment.analyze(post.title).score;
    if (post.sentiment <= -1) score[2] ++;
    else if (post.sentiment >= 1) score[0] ++;
    else score[1] ++;
  });
  var chartData = {
    
    labels: [ "Positive", "Neutral", "Negative" ],
    datasets: [
      {
        label: "Number of Posts",
        data: [score[0], score[1], score[2]],
        backgroundColor: [
          "#00FF00",
          "#FFFF00",
          "#FF0000",
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]
  }

  var options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  if (score[0] + score[1] + score[2] === 0){

    options = {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }

    chartData = {
    
      labels: [],
      datasets: [
        {
          data: [1],
          backgroundColor: [
            "#808080"
          ],
          borderColor: "black",
          borderWidth: 1
        }
      ]
    }
  }
  return (
    
    <div className="multiple">
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        <Pie
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
}
export default PieChart;
