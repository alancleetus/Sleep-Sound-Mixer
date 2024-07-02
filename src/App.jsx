// eslint-disable-next-line no-unused-vars
import React from "react";
import MusicComponent from "./components/MusicComponent.jsx";
import Box from "@mui/material/Box";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { v4 as uuidv4 } from "uuid";
import { Howler } from "howler";

function App() {
  Howler.volume(0.5);
  const sounds = [
    { uuid: uuidv4(), song: "/sounds/music.mp3", icon: MusicNoteIcon },
    { uuid: uuidv4(), song: "/sounds/rain.mp3", icon: ThunderstormIcon },
    { uuid: uuidv4(), song: "/sounds/lofi.mp3", icon: MusicNoteIcon },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {sounds.map((sound) => {
        return (
          <MusicComponent
            key={sound.uuid}
            song={sound.song}
            Icon={sound.icon}
          />
        );
      })}
    </Box>
  );
}

export default App;
