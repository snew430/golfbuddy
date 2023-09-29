import './Media.scss';
import {Tweet} from 'react-twitter-widgets';

const Media = () => {
  return (
    <div id="media">
      <h1>Some of our Favorites...</h1>
      <div className="video-div">
        <h3>Are you not entertained?...</h3>
        <Tweet
          tweetId="1326283326718664706"
          options={
            {
              // width: '70%',
              // width: '200',
            }
          }
        />
      </div>
      <div className="video-div">
        <h3>Our House, Our Rules...</h3>
        <iframe
          width="795"
          height="447"
          src="https://www.youtube.com/embed/30B7RYcorGQ"
          title="Irish Golf Vs American Golf"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Media;
