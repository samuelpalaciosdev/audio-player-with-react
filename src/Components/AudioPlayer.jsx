import { reference } from "@popperjs/core";
import React, { useState, useRef, useEffect } from "react";
import AudioControls from "./AudioControls";

let api = "http://assets.breatheco.de/apis/sound/songs";

const AudioPlayer = () => {
  const [songs, setSongs] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(null);

  let audioRef = useRef(null);

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

  const playOrPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  //   for (let i = 0; i < songs.length; i++) {
  //     console.log(songs[i].url);
  //   }
  //   console.log(songs[0].id);

  // Player functions

  return (
    <div className="playlist-container">
      <ul className="list-group text-light bg-dark p-3">
        {!!songs &&
          songs.length > 0 &&
          songs.map((song, index) => {
            return (
              <li
                key={index}
                className="list-item d-flex flex-row fw-semibold"
                onClick={playOrPause}
              >
                <span className="song-id">{song.id}</span>
                {song.name}
                <a
                  href={`https://assets.breatheco.de/apis/sound/${song.url}`}
                  target="_blank"
                >
                  Click
                </a>
              </li>
            );
          })}
      </ul>
      <audio src={`${audioRef}`}></audio>
      <AudioControls isPlaying={isPlaying} />
    </div>
  );
};

export default AudioPlayer;

// import React, { useState, useRef, useEffect } from "react";

// let api = "http://assets.breatheco.de/apis/sound/songs";

// const AudioPlayer = () => {
//   const [songs, setSongs] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [current, setCurrent] = useState(null);

//   let audioRef = useRef(null);

//   const setAudioRef = ({ id, src }) => {
//     audioRef.current.src = src;
//     audioRef.current.id = id;
//   };

//   const getSongs = (url) => {
//     fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => setSongs(data))
//       .catch((error) => console.log(error));
//   };

//   return (
//     <>
//       <h1>Audio</h1>
//     </>
//   );
// };

// export default AudioPlayer;
