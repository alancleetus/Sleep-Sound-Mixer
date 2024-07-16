// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";
import { Howl, Howler } from "howler";
import PropTypes from "prop-types";
import "../app.css";

const MusicComponent = React.forwardRef(
  ({ name, song, Icon, modalMode }, ref) => {
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
    const changeVolume = (newValue) => {
      setVolume(newValue / 100);
      console.log("changeVol " + newValue);
    };

    const getPlaying = () => {
      return playing;
    };

    // Expose pauseSound method to parent component
    useImperativeHandle(ref, () => ({
      pauseSound,
      changeVolume,
      getPlaying,
    }));

    return (
      <div>
        {modalMode ? (
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <ToggleButton
              className="sound-toggle-button"
              value={name}
              aria-label={name}
              selected={playing}
              onChange={() => {
                handleOnClick();
              }}
            >
              {Icon && (
                <img
                  src={Icon}
                  alt={`${name} icon`}
                  style={{ width: 35, height: 35 }}
                />
              )}
            </ToggleButton>
            <Slider
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={handleVolumeChange}
            />
          </Stack>
        ) : (
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: 500,
              gap: 2,
              mb: 3,
            }}
          >
            <ToggleButton
              id="sound-toggle-button"
              value={name}
              aria-label={name}
              selected={playing}
              onChange={() => {
                handleOnClick();
              }}
            >
              {Icon && (
                <img
                  src={Icon}
                  alt={`${name} icon`}
                  style={{ width: 35, height: 35 }}
                  className="svg-color-filter"
                />
              )}
            </ToggleButton>{" "}
          </Stack>
        )}
        {/* <Typography variant="h6" component="h2">
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
        </button>*/}
      </div>
    );
  }
);

MusicComponent.propTypes = {
  song: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  Icon: PropTypes.string.isRequired,
  modalMode: PropTypes.bool.isRequired,
};

MusicComponent.displayName = "MusicComponent";

export default MusicComponent;
