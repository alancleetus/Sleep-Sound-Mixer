// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Howl, Howler } from "howler";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import "./musicComponent.css";

import ToggleButton from "@mui/material/ToggleButton";
const MusicComponent = React.forwardRef(({ name, song }, ref) => {
  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);

  // useRef so the Howl object does not get recreated on render
  var howlInstance = useRef(null);

  /* 
    *   The useEffect hook updates the volume of the Howl instance whenever the volume state changes.
        The useEffect hook takes two arguments:
        1. A function (effect) that contains the code you want to run.
        2. An optional array of dependencies that determines when the effect should run.*/
  useEffect(() => {
    if (!howlInstance.current) {
      howlInstance.current = new Howl({
        src: [song],
        volume: volume,
        loop: true, // Enable looping
      });
    }
    howlInstance.current.volume(volume);
  }, [volume, song]);

  const handleOnClick = () => {
    if (!howlInstance.current) {
      howlInstance.current = new Howl({
        src: [song],
        volume: volume,
        loop: true, // Enable looping
      });
    }
    /*
     * Ensure the audio context is resumed before performing any play/pause actions.
     * Modern browsers (especially Chrome) start the Web Audio API context in a
     * "suspended" state by default to prevent unwanted audio playback.
     * Resuming the audio context ensures it is in a "running" state, allowing
     * audio operations (play/pause) to execute without issues.
     * This guarantees that user interactions with the play/pause button work
     * consistently and correctly, avoiding potential errors or blocked actions.
     */
    Howler.ctx.resume().then(() => {
      setPlaying((prevValue) => {
        if (prevValue) {
          howlInstance.current.pause(); // Pause the sound, retaining the current position
        } else {
          howlInstance.current.play(); // Play the sound, resuming from the current position
        }
        return !prevValue;
      });
    });
  };

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue / 100);
  };

  const pauseSound = () => {
    if (howlInstance.current) {
      howlInstance.current.pause();
      setPlaying(false);
    }
  };

  // Expose pauseSound method to parent component
  useImperativeHandle(ref, () => ({
    pauseSound,
  }));

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: 500,
          gap: 2,
          mb: 3,
        }}
      >
        {Icon && <Icon sx={{ mr: 2 }} />}
        <Typography variant="h6" component="h2">
          {name}
        </Typography>
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleVolumeChange}
        />
        <button onClick={handleOnClick}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
      </Box>
    </div>
  );
});

MusicComponent.propTypes = {
  song: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

MusicComponent.displayName = "MusicComponent";

export default MusicComponent;
