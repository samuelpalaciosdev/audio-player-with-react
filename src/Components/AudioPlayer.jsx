import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {
  const [songs, setSongs] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(null);

  let audioRef = useRef(null);

  const setAudioRef = ({ id, src }) => {
    audioRef.current.src = src;
    audioRef.current.id = id;
  };

  return (
    <>
      <h1>Audio</h1>
    </>
  );
};

export default AudioPlayer;
