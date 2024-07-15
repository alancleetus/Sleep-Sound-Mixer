// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import MusicComponent from "./components/MusicComponent.jsx";
import Box from "@mui/material/Box";
import { Howler } from "howler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

import { database } from "./Firebase";
import { ref, onValue } from "firebase/database";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import SleepTimer from "./components/SleepTimer.jsx";

import NatureIcon from "@mui/icons-material/Nature";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import StormIcon from "@mui/icons-material/Storm";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WavesIcon from "@mui/icons-material/Waves";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import GrainIcon from "@mui/icons-material/Grain";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Grid from "@mui/material/Grid";
function App() {
  Howler.volume(0.5);

  const icons = {
    NatureIcon,
    AcUnitIcon,
    StormIcon,
    WaterDropIcon,
    ThunderstormIcon,
    WavesIcon,
    DirectionsWalkIcon,
    UmbrellaIcon,
    GrainIcon,
    FlashOnIcon,
    MusicNoteIcon,
  };

  const [sounds, setSounds] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const fetchSounds = () => {
    console.log("Fetching sounds...");
    const soundsRef = ref(database, "sounds");
    onValue(
      soundsRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Raw Data:", data); // Log raw data
        if (data) {
          const soundList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            Icon: icons[data[key].icon], // Map the icon string to the actual icon component
          }));
          console.log("Processed Sound List:", soundList); // Log processed data
          setSounds(soundList);
        } else {
          console.log("No data found at the 'sounds' path");
        }
      },
      (error) => {
        console.error("Error fetching data from Firebase:", error);
      }
    );
  };
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
      fetchSounds();
    } catch (error) {
      console.error("Error signing in test user:", error);
    }
  };
  const musicRefs = useRef([]);

  const pauseAllSounds = () => {
    musicRefs.current.forEach((ref) => ref?.pauseSound());
  };
  return (
    <>
      <Container className="main-app-container">
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

            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {sounds.map((sound, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={sound.id}>
                    <MusicComponent
                      key={sound.id}
                      name={sound.name}
                      song={sound.url}
                      // Icon={sound.icon}
                      ref={(el) => (musicRefs.current[index] = el)}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Fab
              className="fab-volume-mixer"
              id="custom-fab"
              variant="extended"
              size="medium"
            >
              <TuneOutlinedIcon sx={{ mr: 1 }} />
              Volume Mixer
            </Fab>
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
