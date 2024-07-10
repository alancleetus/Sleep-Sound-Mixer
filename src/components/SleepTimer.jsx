import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

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

  return (
    <>
      <p>
        {Math.floor(timer / 60 / 60)}h {Math.floor((timer / 60) % 60)}m{" "}
        {timer % 60}s
      </p>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button value="30" onClick={handleClick}>
          30m
        </Button>
        <Button value="45" onClick={handleClick}>
          45m
        </Button>
        <Button value="60" onClick={handleClick}>
          1h
        </Button>
        <Button value="90" onClick={handleClick}>
          1h 30m
        </Button>
        <Button value="120" onClick={handleClick}>
          2h
        </Button>
        {isRunning ? (
          <Button onClick={handleStop}>Stop</Button>
        ) : (
          <Button onClick={handleStart}>Start</Button>
        )}
        <Button onClick={handleReset}>Reset</Button>
      </ButtonGroup>
    </>
  );
}
