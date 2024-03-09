import ReactWordcloud from 'react-wordcloud';
import "../styles/components/Wordcloud.css";

function Wordcloud( { posts } ) {

  function getWordFrequencies(posts){
    var words = [];
    var freqMap = new Map();

    //get words in all post titles
    posts.forEach((p) => {
        words.push(...p.title.replace(/[.]/g, '').split(/\s/));
    });

    //determine frequency of each word
    words.forEach((w) => {
        if (!freqMap.get(w)) {
            freqMap.set(w, 0);
        }
        freqMap.set(w, freqMap.get(w)+1);
    });

    //convert word map into array to be used by wordcloud
    const arr = Array.from(freqMap).map(([text, value]) => ({
        text,
        value,
      }));
    return arr
  }

  const options = {
    rotations: 2,
    rotationAngles: [0, 0],
    fontSizes: [20, 40]
  };
  //const size = [700,400];

  return (
    <div className="wordcloud">
      <ReactWordcloud words={getWordFrequencies(posts)} options={options}/>
    </div>
  );
}

export default Wordcloud;

