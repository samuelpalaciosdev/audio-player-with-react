import React from "react";

const AudioControls = ({ isPlaying }) => {
  return (
    <div className="footer-btns d-flex justify-content-center text-light sticky-bottom">
      <button
        type="button"
        className="player-btn prev-btn player-btn--gray"
        aria-label="Previous"
      >
        <i className="fa-solid fa-caret-left fa-xl"></i>
      </button>

      {/* Depending if song is being played, change the buttons */}
      {isPlaying ? (
        <button
          type="button"
          className="player-btn pause-btn"
          aria-label="Pause"
        >
          <i class="fa-solid fa-pause fa-2x"></i>
        </button>
      ) : (
        <button type="button" className="player-btn play-btn" aria-label="Play">
          <i className="fa-solid fa-play fa-2x"></i>
        </button>
      )}

      <button
        type="button"
        className="player-btn next-btn player-btn--gray"
        aria-label="Next"
      >
        <i className="fa-solid fa-caret-right fa-xl"></i>
      </button>
    </div>
  );
};

export default AudioControls;
