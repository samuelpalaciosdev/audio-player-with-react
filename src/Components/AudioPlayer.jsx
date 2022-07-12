import { reference } from "@popperjs/core";
import React, { useState, useRef, useEffect } from "react";
import AudioControls from "./AudioControls";

let api = "http://assets.breatheco.de/apis/sound/songs";

const AudioPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(null);

  let audioRef = useRef(null);
  let isReady = useRef(false);

  const setAudioRef = ({ id, src }) => {
    audioRef.current.id = id;
    audioRef.current.src = src;
  };

  // Run only once
  useEffect(() => {
    getSongs(api);
  }, []);

  // Fetching data from API
  const getSongs = (url) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Setting data obtained from API to the songs state
        setSongs(data);
      })
      // Handle errors
      .catch((error) => {
        console.log(error);
      });
  };

  // Play/Pause based on the isPlaying state

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [current]);

  /*Prev Track Function*/

  const toPrevTrack = () => {
    let currSong = songs[current - 1];
    if (current - 1 < 0) {
      setCurrent(songs.length - 1);
      // By the above logic Set the audio src to the current song
      setAudioRef({
        src: `https://assets.breatheco.de/apis/sound/${
          songs[songs.length - 1].url
        }`,
      });
    } else {
      setCurrent(current - 1);
      // By the above logic Set the audio src to the current song
      setAudioRef({
        src: `https://assets.breatheco.de/apis/sound/${currSong.url}`,
      });
    }
  };

  const toNextTrack = () => {
    let currSong = songs[current + 1];
    if (current < songs.length - 1) {
      setCurrent(current + 1);
      // By the above logic Set the audio src to the current song
      setAudioRef({
        src: `https://assets.breatheco.de/apis/sound/${currSong.url}`,
      });
    } else {
      setCurrent(1);
      // By the above logic Set the audio src to the current song
      setAudioRef({
        src: `https://assets.breatheco.de/apis/sound/${songs[0].url}`,
      });
    }
  };

  /*
    Change isPlaying state value to its opossite everytime the play/pause button is clicked,
    an onClick is set on it with this funct on the AudioControls.jsx
  */
  const playOrPause = () => {
    setIsPlaying(!isPlaying);
  };

  // On click of li element, change the audioRef so it can be played
  const handleClick = (url) => {
    // playOrPause();
    setAudioRef({ src: `https://assets.breatheco.de/apis/sound/${url}` });
  };

  return (
    <div className="playlist-container">
      <ul className="list-group text-light bg-dark">
        {!!songs &&
          songs.length > 0 &&
          songs.map((song, index) => {
            return (
              <>
                <li
                  key={index}
                  className="list-item d-flex flex-row fw-semibold px-4"
                  onClick={() => {
                    playOrPause();
                    // When li elem clicked, set the current state value to the li clicked
                    setCurrent(index);
                    // When li elem clicked, set the audioRef to the current li song url
                    handleClick(`${song.url}`);
                  }}
                >
                  <span className="song-id">{song.id}</span>
                  {song.name}
                </li>
              </>
            );
          })}
      </ul>
      {/* Use the audioRef value to play the current song */}
      <audio src={audioRef} ref={audioRef}></audio>
      <AudioControls
        isPlaying={isPlaying}
        toPrevTrack={toPrevTrack}
        playOrPause={playOrPause}
        toNextTrack={toNextTrack}
      />
    </div>
  );
};

export default AudioPlayer;
