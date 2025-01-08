import React from "react";
import "../scss/styles/second.scss";
import video from '../images/video.mp4'

const VideoSection = () => {
  return (
    <section className="video-section">
      <div className="video-section__header">
        <h2>A solution for teams that value efficiency.</h2>
      </div>
      <div className="video-container">
        <div className="video-box video-box--first">
          <video
            className="video-box__video"
            src={video}
            muted loop
            autoPlay
            
          />
        </div>
        <div className="video-box video-box--second">
          <video
            className="video-box__video"
            src={video}
            muted
            loop
            autoPlay
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

