import './Media.scss';

const Media = () => {
  return (
    <div id="media">
      <div className="video-div">
        <h3>Are you not entertained?...</h3>
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            Incase you didn’t see this peach 🍑 from Jon Rahm Rodríguez at{' '}
            <a href="https://twitter.com/hashtag/augusta?src=hash&amp;ref_src=twsrc%5Etfw">
              #augusta
            </a>{' '}
            today 😳😳{' '}
            <a href="https://t.co/wjX1mLH6mF">pic.twitter.com/wjX1mLH6mF</a>
          </p>
          &mdash; Ray Boyne (@AnalysisGaa){' '}
          <a href="https://twitter.com/AnalysisGaa/status/1326283326718664706?ref_src=twsrc%5Etfw">
            November 10, 2020
          </a>
        </blockquote>
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
