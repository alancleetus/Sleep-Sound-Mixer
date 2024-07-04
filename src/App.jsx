// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import MusicComponent from "./components/MusicComponent.jsx";
import Box from "@mui/material/Box";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { v4 as uuidv4 } from "uuid";
import { Howler } from "howler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

function App() {
  Howler.volume(0.5);
  const sounds = [
    { uuid: uuidv4(), song: "/sounds/music.mp3", icon: MusicNoteIcon },
    { uuid: uuidv4(), song: "/sounds/rain.mp3", icon: ThunderstormIcon },
    { uuid: uuidv4(), song: "/sounds/lofi.mp3", icon: MusicNoteIcon },
  ];

  const [loggedIn, setLoggedIn] = useState(false);
  const loginAsTestUser = async () => {
    const testEmail = "test@test.com"; // Replace with your test account email
    const testPassword = "testpass1!"; // Replace with your test account password

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        testEmail,
        testPassword
      );
      console.log("Test user signed in:", userCredential.user);
      setLoggedIn(true);
    } catch (error) {
      console.error("Error signing in test user:", error);
    }
  };
  return !loggedIn ? (
    <button onClick={loginAsTestUser}>Login as Test User</button>
  ) : (
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
