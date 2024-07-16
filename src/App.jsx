// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import MusicComponent from "./components/MusicComponent.jsx";
import { Howler } from "howler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

import { database } from "./Firebase";
import { ref, onValue } from "firebase/database";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import SleepTimer from "./components/SleepTimer.jsx";

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Grid from "@mui/material/Grid";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import PauseIcon from "@mui/icons-material/Pause";
import ButtonGroup from "@mui/material/ButtonGroup";

import "./app.css";
function App() {
  Howler.volume(0.5);

  const [sounds, setSounds] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [volumes, setVolumes] = useState({});

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
          }));
          console.log("Processed Sound List:", soundList); // Log processed data
          setSounds(soundList);

          // Initialize volumes state with default values
          const initialVolumes = soundList.reduce((acc, sound) => {
            acc[sound.id] = 50; // Default volume
            return acc;
          }, {});
          setVolumes(initialVolumes);
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

  const handleVolumeChange = (id, newVolume) => {
    setVolumes((prevVolumes) => ({
      ...prevVolumes,
      [id]: newVolume,
    }));

    if (musicRefs.current[id]) {
      musicRefs.current[id].changeVolume(newVolume);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id="main-div">
      <div id="background-blob"></div>
      <Container id="header-container">
        <Typography id="app-heading" gutterBottom>
          Sleep Sounds Mixer
        </Typography>
      </Container>
      <Container maxWidth="sm" id="main-app-container">
        <CssBaseline />
        {!loggedIn ? (
          <Button variant="contained" onClick={loginAsTestUser}>
            Login as Test User
          </Button>
        ) : (
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SleepTimer PauseAll={pauseAllSounds} />
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {sounds.map((sound, index) => {
                return (
                  <Grid item xs={4} sm={3} md={2} key={sound.id}>
                    <MusicComponent
                      key={sound.id}
                      name={sound.name}
                      song={sound.url}
                      Icon={sound.icon}
                      modalMode={false}
                      ref={(el) => (musicRefs.current[index] = el)}
                    />
                  </Grid>
                );
              })}
            </Grid>

            <div id="fab-container">
              <Fab size="small" onClick={pauseAllSounds} id="custom-fab">
                <PauseIcon />
              </Fab>{" "}
              <Fab
                className="fab-volume-mixer"
                id="custom-fab"
                variant="extended"
                size="medium"
                onClick={handleOpen}
              >
                <TuneOutlinedIcon sx={{ mr: 1 }} />
                Volume Mixer
              </Fab>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Stack
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  {sounds.map((sound, index) => {
                    const ref = musicRefs.current[index];
                    return ref && ref.getPlaying() ? (
                      <Grid item xs={12} sm={6} md={4} key={sound.id}>
                        <img
                          src={sound.icon}
                          alt={`${sound.name} icon`}
                          style={{ width: 35, height: 35 }}
                          className=""
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volumes[index]}
                          onChange={(e) =>
                            handleVolumeChange(index, e.target.value)
                          }
                        />
                      </Grid>
                    ) : null;
                  })}
                </Grid>
              </Stack>
            </Modal>
          </Stack>
        )}
      </Container>
    </div>
  );
}

export default App;
