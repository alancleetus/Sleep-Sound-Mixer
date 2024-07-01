// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Howl, Howler } from "howler";
import "./App.css";
import music from "/rain.mp3";

function App() {
  // const [playing, setPlaying] = useState(false);
  // const [volume, setVolume] = useState(0.5);
  // const musicPlay = useRef(
  //   new Howl({
  //     src: [music],
  //     volume: volume,
  //   })
  // );

  // Howler.volume(volume);

  // useEffect(() => {
  //   musicPlay.current.volume(volume);
  // }, [volume]);

  // const handleOnClick = () => {
  //   setPlaying((prevValue) => {
  //     if (prevValue) {
  //       musicPlay.current.pause();
  //     } else {
  //       musicPlay.current.play();
  //     }
  //     return !prevValue;
  //   });
  // };

  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);

  var musicPlay = new Howl({
    src: [{ music }],
    volume: volume,
  });
  Howler.volume(volume);

  const handleOnClick = () => {
    setPlaying((prevValue) => {
      return !prevValue;
    });
    console.log(`${playing}: ${musicPlay} from file ${music}`);
    playing ? musicPlay.play() : musicPlay.pause();
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
  };
  return (
    <>
      <Box sx={{ width: 300 }}>
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleVolumeChange}
        />
      </Box>
      <button onClick={handleOnClick}>{playing ? "Pause" : "Play"}</button>
    </>
  );
}

export default App;
