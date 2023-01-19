import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { Close, Share, Group } from '@mui/icons-material';
import { getMovieById } from '../../api';
import { AutoComplete, TMDBActor, Stat } from '../../classes';
import { parseStats, formatTimer } from '../../util';
import { colors } from '../../constants';

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
  const [stats] = React.useState<string | null>(localStorage.getItem('stats'));
  const [hints] = React.useState<string | null>(localStorage.getItem('hints'));
  const [parsedStats] = React.useState<Stat | undefined>(parseStats(stats));
  const [searchParams] = useSearchParams();

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
            backgroundColor: colors.paperBackground,
            color: 'white',
            border: 'solid white',
            borderRadius: 10,
          },
        }}
      >
        <DialogTitle>
          {submittedResult ? 'Correct' : 'Incorrect'}
          <IconButton
            onClick={handleModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={contentStyle}>
          {!searchParams.get('time') && (
            <div>
              {submittedResult ? 'Congrats!' : 'Better Luck Next Time!'}
            </div>
          )}
          <div>{submittedResult ? `Current Streak: ${streak}` : ''}</div>
          <div>{submittedResult ? formatTimer(time) : ''}</div>
          {searchParams.get('time') && (
            <div>
              {time < parseInt(searchParams.get('time') as string)
                ? `Congrats! Your time was better than the challenged time of ${formatTimer(
                    parseInt(searchParams.get('time') as string),
                  )}.`
                : `Sorry, your time was not better than the challenged time of ${formatTimer(
                    parseInt(searchParams.get('time') as string),
                  )}.`}
            </div>
          )}
          {submittedResult &&
            searchParams.get('hints') &&
            (hints === 'false' || !hints) && (
              <div>Your challenger had hints enabled but you did not</div>
            )}
          {submittedResult && searchParams.get('hints') && hints === 'true' && (
            <div>Both you and your chanllenger had hints enabled</div>
          )}
          {submittedResult &&
            !searchParams.get('hints') &&
            hints === 'true' && (
              <div>You had hints enabled but your challenger did not</div>
            )}
        </DialogContent>

        <DialogActions sx={buttonWrapper}>
          <Button sx={buttonStyle} variant="contained" onClick={handleShare}>
            Share <Share />
          </Button>
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={handleChallenge}
          >
            Challenge <Group />
          </Button>
          <Button
            sx={buttonStyle}
            variant="contained"
            onClick={() => handleRetry()}
          >
            Retry
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

      {submitDisabled ? (
        <>
          <Button
            data-cy="RetryButton"
            onClick={handleRetry}
            sx={retryStyle}
            variant="contained"
          >
            Retry
          </Button>
          <Button
            data-cy="PlayAgainButton"
            onClick={handlePlayAgain}
            sx={buttonStyle}
            variant="contained"
          >
            Play Again
          </Button>
        </>
      ) : (
        <Button
          disabled={!guesses || guesses.length < 1}
          onClick={verifyAnswer}
          sx={buttonStyle}
          variant="contained"
          data-cy="SubmitButton"
        >
          Submit {submittedResult && submittedResult.toString()}
        </Button>
      )}
    </div>
  );

  function handleRetry() {
    if (searchParams.get('firstActor')) window.location.reload();
    else {
      if (firstActor && secondActor) {
        window.location.replace(
          `${window.location.protocol}//${window.location.hostname}${
            window.location.port ? `:${window.location.port}` : ''
          }?firstActor=${encodeURIComponent(
            firstActor.name,
          )}&secondActor=${encodeURIComponent(secondActor.name)}`,
        );
      }
    }
  }

  function handlePlayAgain() {
    window.location.replace(
      `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`,
    );
  }

  function handleChallenge() {
    if (firstActor && secondActor) {
      let writeValue = `${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }?firstActor=${encodeURIComponent(
        firstActor.name,
      )}&secondActor=${encodeURIComponent(secondActor.name)}${
        submittedResult ? `&time=${time}` : ''
      }${localStorage.getItem('hints') === 'true' ? '&hints=true' : ''}`;
      navigator.clipboard.writeText(writeValue);
      setCopyOpen(true);
    }
  }

  function handleShare() {
    let writeValue = `🥓Six Degrees of Kevin Bacon 🥓\n⭐${
      firstActor?.name
    } ➡️ ${secondActor?.name}⭐\n${parseGuesses()}\n⏱️${formatTimer(
      time,
    )}\nsixdob.com`;
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
    handleStatUpdate(validationFlag);
  }

  function handleStatUpdate(correct: boolean) {
    let tempStats = parsedStats ? parsedStats : new Stat();
    if (correct && streak && tempStats.longestStreak < parseInt(streak) + 1) {
      tempStats.longestStreak = parseInt(streak) + 1;
    }
    if (!tempStats.fastestTime || tempStats.fastestTime > time) {
      tempStats.fastestTime = time;
    }
    tempStats.gamesPlayed++;
    if (correct) tempStats.wins++;
    localStorage.setItem('stats', JSON.stringify(tempStats));
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
    window.location.replace(
      `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`,
    );
  }

  function handleModalClose() {
    setModalOpen(false);
    setSubmitDisabled(true);
    submitCallback();
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
  textAlign: 'center',
};

const buttonWrapper = {
  justifyContent: 'center',
  display: 'flex',
  flexWrap: 'wrap',
};

const retryStyle = {
  ...buttonStyle,
  marginRight: '1%',
};
