import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { getMovieById } from '../../api';
import { AutoComplete, TMDBActor } from '../../classes';
import { Share, Group } from '@mui/icons-material';

export function Submit({
  guesses,
  firstActor,
  secondActor,
  submitCallback,
}: {
  guesses?: AutoComplete[];
  firstActor?: TMDBActor;
  secondActor?: TMDBActor;
  submitCallback: () => void;
}) {
  const [submittedResult, setSubmittedResult] = React.useState<boolean>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [copyOpen, setCopyOpen] = React.useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(false);
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(true);
  const [streak, setStreak] = React.useState<string | null>(
    localStorage.getItem('streak'),
  );

  React.useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <Snackbar open={copyOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Copied results to clipboard
        </Alert>
      </Snackbar>

      <Dialog
        open={modalOpen}
        PaperProps={{
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            backgroundColor: '#1b2127',
            color: 'white',
            border: 'solid white',
            borderRadius: 10,
          },
        }}
      >
        <DialogTitle>{submittedResult ? 'Correct' : 'Incorrect'}</DialogTitle>

        <DialogContent sx={contentStyle}>
          <div>{submittedResult ? 'Congrats!' : 'Better Luck Next Time!'}</div>
          <div>{submittedResult ? `Current Streak: ${streak}` : ''}</div>
          <div>{submittedResult ? formatTimer(time) : ''}</div>
        </DialogContent>

        <DialogActions sx={buttonWrapper}>
          <Button
            disabled={window.location.protocol === 'http:'}
            sx={buttonStyle}
            variant="contained"
            onClick={handleShare}
          >
            Share <Share />
          </Button>
          <Button
            disabled={window.location.protocol === 'http:'}
            sx={buttonStyle}
            variant="contained"
            onClick={handleChallenge}
          >
            Challenge <Group />
          </Button>
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={handleModalClose}
          >
            Close
          </Button>
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => handleReload()}
          >
            Play Again
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        disabled={!guesses || guesses.length < 1 || submitDisabled}
        onClick={verifyAnswer}
        sx={buttonStyle}
        variant="contained"
        data-cy="SubmitButton"
      >
        Submit {submittedResult && submittedResult.toString()}
      </Button>
    </div>
  );

  function handleChallenge() {
    if (firstActor && secondActor) {
      let writeValue = `${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }?firstActor=${encodeURIComponent(
        firstActor.name,
      )}&secondActor=${encodeURIComponent(secondActor.name)}`;
      navigator.clipboard.writeText(writeValue);
      setCopyOpen(true);
    }
  }

  function handleShare() {
    let writeValue = `🥓Six Degrees of Kevin Bacon 🥓\n⭐${
      firstActor?.name
    } ➡️ ${secondActor?.name}⭐\n${parseGuesses()}\n⏱️${formatTimer(time)}`;
    navigator.clipboard.writeText(writeValue);
    setCopyOpen(true);
  }

  function parseGuesses() {
    let tempString = '';
    let length = 0;
    if (submittedResult) {
      guesses?.forEach(() => {
        tempString += '🟩';
        length++;
      });
    } else {
      guesses?.forEach(() => {
        tempString += '🟥';
        length++;
      });
    }
    for (let i = 0; i < 6 - length; i++) {
      tempString += '🔲';
    }
    return tempString;
  }

  async function verifyAnswer() {
    setRunning(false);
    let validationFlag = false;
    if (guesses && guesses.length > 0) {
      for (let i = 0; i < guesses.length; i++) {
        // Validate first movie contains first actor
        if (i === 0 && guesses[0].id) {
          const result = await getMovieById(guesses[0].id);
          for (let x = 0; x < result.length; x++) {
            if (firstActor && result[x].name === firstActor.name) {
              validationFlag = true;
              break;
            } else validationFlag = false;
          }
          // If only one movie, validate first movie contains second actor
          if (guesses.length === 1 && validationFlag) {
            for (let y = 0; y < result.length; y++) {
              if (secondActor && result[y].name === secondActor.name) {
                validationFlag = true;
                break;
              } else validationFlag = false;
            }
          }
        }
        //If more than one movie, validate last movie contains second actor
        if (i === guesses.length - 1 && guesses.length > 1 && validationFlag) {
          //@ts-ignore next-line
          const result = await getMovieById(guesses[guesses.length - 1].id);
          for (let i = 0; i < result.length; i++) {
            if (secondActor && result[i].name === secondActor.name) {
              validationFlag = true;
              break;
            } else validationFlag = false;
          }
        }
        //Validate the neighboring movies share and actor
        if (guesses[i + 1] && validationFlag) {
          //@ts-ignore next-line
          const currentResult = await getMovieById(guesses[i].id);
          //@ts-ignore next-line
          const nextResult = await getMovieById(guesses[i + 1].id);
          for (let z = 0; z < currentResult.length; z++) {
            const filterResult = nextResult.filter((actor: any) => {
              return actor.name === currentResult[z].name;
            });
            if (filterResult.length > 0) {
              validationFlag = true;
              break;
            } else validationFlag = false;
          }
        }
      }
    }
    setSubmittedResult(validationFlag);
    setModalOpen(true);
    handleStreak(validationFlag);
  }

  function handleStreak(correct: boolean) {
    if (correct) {
      if (streak) {
        localStorage.setItem('streak', (parseInt(streak) + 1).toString());
        setStreak((parseInt(streak) + 1).toString());
      } else {
        localStorage.setItem('streak', '1');
        setStreak('1');
      }
    } else if (streak) {
      localStorage.setItem('streak', '0');
      setStreak('0');
    }
  }

  function handleReload() {
    window.location.reload();
  }

  function handleModalClose() {
    setModalOpen(false);
    setSubmitDisabled(true);
    submitCallback();
  }

  function formatTimer(time: number) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
    return `${minutes} min(s) ${seconds} sec(s)`;
  }

  function handleClose() {
    setCopyOpen(false);
  }
}

const buttonStyle = {
  marginTop: '5%',
};

const contentStyle = {
  alignItems: 'center',
};

const buttonWrapper = {
  justifyContent: 'center',
  display: 'flex',
  flexWrap: 'wrap',
};
