import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";

import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./timerStyle.css";
import { ButtonGroup } from "@mui/material";

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

  return (
    <>
      <p>
        {Math.floor(timer / 60 / 60)}h {Math.floor((timer / 60) % 60)}m{" "}
        {timer % 60}s
      </p>
      <AlarmOutlinedIcon onClick={handleOpen} sx={{ cursor: "pointer" }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
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
          <CloseOutlinedIcon onClick={handleClose} className="close-modal" />
        </Box>
      </Modal>
    </>
  );
}

SleepTimer.propTypes = {
  PauseAll: PropTypes.func.isRequired,
};
