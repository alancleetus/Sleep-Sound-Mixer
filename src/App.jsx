// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from "react";
import MusicComponent from "./components/MusicComponent.jsx";
import Box from "@mui/material/Box";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { v4 as uuidv4 } from "uuid";
import { Howler } from "howler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "./Firebase";
import { ref } from "firebase/storage";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import SleepTimer from "./components/SleepTimer.jsx";
function App() {
  Howler.volume(0.5);
  /* TODO: UPLOAD MUSIC https://www.youtube.com/watch?v=YOAeBSCkArA */

  const sounds = [
    {
      uuid: uuidv4(),
      name: "music",
      song: "https://firebasestorage.googleapis.com/v0/b/react-sound-mixer.appspot.com/o/music.mp3?alt=media&token=626619a3-d1b5-4a29-a8bc-479327b4f144",
      icon: MusicNoteIcon,
    },
    {
      uuid: uuidv4(),
      name: "thunder storm",
      song: "https://firebasestorage.googleapis.com/v0/b/react-sound-mixer.appspot.com/o/rain.mp3?alt=media&token=dcea3e2f-8d7d-4dcc-86c1-27a97d39ac83",
      icon: ThunderstormIcon,
    },
    {
      uuid: uuidv4(),
      name: "lofi",
      song: "https://firebasestorage.googleapis.com/v0/b/react-sound-mixer.appspot.com/o/lofi.mp3?alt=media&token=7e91427e-6b6e-4685-9c8d-2cdad8ab6d92",
      icon: MusicNoteIcon,
    },
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
  const musicRefs = useRef([]);
  const PauseAll = () => {
    console.log("pause");
  };

  const pauseAllSounds = () => {
    musicRefs.current.forEach((ref) => ref?.pauseSound());
  };
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        {!loggedIn ? (
          <Button variant="contained" onClick={loginAsTestUser}>
            Login as Test User
          </Button>
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
            <button onClick={pauseAllSounds}>Pause ALL</button>
            <SleepTimer PauseAll={pauseAllSounds} />
            {sounds.map((sound, index) => {
              return (
                <MusicComponent
                  key={sound.uuid}
                  name={sound.name}
                  song={sound.song}
                  Icon={sound.icon}
                  ref={(el) => (musicRefs.current[index] = el)}
                />
              );
            })}
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
