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

  const generateOptions = (limit) => {
    return Array.from({ length: limit }, (_, i) => (
      <option key={i} value={i}>
        {i}
      </option>
    ));
  };

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
    setTimer(Number(e.target.value) * 60);
    setOpen(false);
    return;
  }
  const setHour = (e) => {
    const hours = Number(e.target.value);
    setTimer((prevTimer) => (prevTimer % 3600) + hours * 3600);
  };

  const setMin = (e) => {
    const minutes = Number(e.target.value);
    setTimer((prevTimer) => {
      const hours = Math.floor(prevTimer / 3600);
      return hours * 3600 + (prevTimer % 60) + minutes * 60;
    });
  };

  const setSec = (e) => {
    const seconds = Number(e.target.value);
    setTimer((prevTimer) => {
      const hours = Math.floor(prevTimer / 3600);
      const minutes = Math.floor((prevTimer / 60) % 60);
      return hours * 3600 + minutes * 60 + seconds;
    });
  };

  const timePickerGrid = () => {
    return (
      <Grid
        id="time-picker-grid"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <select
            id="hours-dd"
            onClick={setHour}
            value={Math.floor(timer / 60 / 60)}
          >
            {generateOptions(24)}
          </select>
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
          <Typography variant="h6" style={{ width: "25px", color: "#7900f8" }}>
            :
          </Typography>
        </Grid>
        <Grid item>
          <select
            id="mins-dd"
            onClick={setMin}
            value={Math.floor((timer / 60) % 60)}
          >
            {generateOptions(60)}
          </select>
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
          <Typography variant="h6" style={{ width: "25px", color: "#7900f8" }}>
            :
          </Typography>
        </Grid>
        <Grid item>
          <select id="sec-dd" onClick={setSec} value={Math.floor(timer % 60)}>
            {generateOptions(60)}
          </select>
        </Grid>
      </Grid>
    );
  };

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
            {!open && (
              <Button
                variant="outlined"
                id="outline-button"
                onClick={handleOpen}
              >
                <AlarmOutlinedIcon />
              </Button>
            )}

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
            {/* <Stack className="modal-time-grid">
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
            </Stack> */}
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
            <Button
              className="time-button"
              variant="outlined"
              value="30"
              onClick={handleClick}
            >
              30m
            </Button>
            <Button
              className="time-button"
              variant="outlined"
              value="45"
              onClick={handleClick}
            >
              45m
            </Button>
            <Button
              className="time-button"
              variant="outlined"
              value="60"
              onClick={handleClick}
            >
              1h
            </Button>
            <Button
              className="time-button"
              variant="outlined"
              value="90"
              onClick={handleClick}
            >
              1h 30m
            </Button>
            <Button
              className="time-button"
              variant="outlined"
              value="120"
              onClick={handleClick}
            >
              2h
            </Button>

            {timePickerGrid()}

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
