import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../app.css";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ButtonGroup } from "@mui/material";

import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";

export default function SleepTimer({ PauseAll }) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      PauseAll();
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, PauseAll]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimer(0);
  };

  function handleClick(e) {
    return setTimer(Number(e.target.value) * 60);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function timerGrid() {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={9}>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="h4" gutterBottom>
                {Math.floor(timer / 60 / 60)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" gutterBottom>
                {Math.floor((timer / 60) % 60)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" gutterBottom>
                {timer % 60}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: { xs: "none", md: "block", lg: "block" } }}
            >
              HOURS
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: { xs: "none", md: "block", lg: "block" } }}
            >
              MINUTES
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: { xs: "none", md: "block", lg: "block" } }}
            >
              SECONDS
            </Grid>

            <Grid
              item
              xs={4}
              sx={{ display: { xs: "block", md: "none", lg: "none" } }}
            >
              HRS
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: { xs: "block", md: "none", lg: "none" } }}
            >
              MIN
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: { xs: "block", md: "none", lg: "none" } }}
            >
              SEC
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="outlined"
          >
            <Button variant="outlined" id="outline-button" onClick={handleOpen}>
              <AlarmOutlinedIcon />
            </Button>
            {isRunning ? (
              <Button
                variant="outlined"
                id="outline-button"
                onClick={handleStop}
              >
                <AlarmOffIcon />
              </Button>
            ) : (
              <Button
                variant="outlined"
                id="outline-button"
                onClick={handleStart}
              >
                <PlayArrowIcon />
              </Button>
            )}
            <Button
              variant="outlined"
              id="outline-button"
              onClick={handleReset}
            >
              <RestartAltIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      <Stack
        width="sm"
        sx={{
          textAlign: "center",
          alignContent: "center",
          marginBottom: "20px",
        }}
      >
        {timerGrid()}
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          background: "var(--background-color)",
          minWidth: "100vw",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <>
          <Stack className="modal-Stack">
            <Stack className="modal-time-grid">
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Typography variant="h4" gutterBottom>
                    {Math.floor(timer / 60 / 60)}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" gutterBottom>
                    {Math.floor((timer / 60) % 60)}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" gutterBottom>
                    {timer % 60}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ display: { xs: "none", md: "block", lg: "none" } }}
                >
                  HOURS
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ display: { xs: "none", md: "block", lg: "none" } }}
                >
                  MINUTES
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ display: { xs: "none", md: "block", lg: "none" } }}
                >
                  SECONDS
                </Grid>

                <Grid
                  item
                  xs={4}
                  sx={{ display: { xs: "block", md: "none", lg: "none" } }}
                >
                  HRS
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ display: { xs: "block", md: "none", lg: "none" } }}
                >
                  MIN
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ display: { xs: "block", md: "none", lg: "none" } }}
                >
                  SEC
                </Grid>
              </Grid>
            </Stack>

            <Button variant="outlined" value="30" onClick={handleClick}>
              30m
            </Button>
            <Button variant="outlined" value="45" onClick={handleClick}>
              45m
            </Button>
            <Button variant="outlined" value="60" onClick={handleClick}>
              1h
            </Button>
            <Button variant="outlined" value="90" onClick={handleClick}>
              1h 30m
            </Button>
            <Button variant="outlined" value="120" onClick={handleClick}>
              2h
            </Button>
            <ButtonGroup>
              {isRunning ? (
                <Button variant="outlined" onClick={handleStop}>
                  Stop
                </Button>
              ) : (
                <Button variant="outlined" onClick={handleStart}>
                  Start
                </Button>
              )}
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            </ButtonGroup>
            <CloseOutlinedIcon
              onClick={handleClose}
              className="close-modal"
              sx={{ position: "absolute", top: "10px", right: "10px" }}
            />
          </Stack>
        </>
      </Modal>
    </>
  );
}

SleepTimer.propTypes = {
  PauseAll: PropTypes.func.isRequired,
};
