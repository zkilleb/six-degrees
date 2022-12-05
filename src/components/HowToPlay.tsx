import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';

export function HowToPlay({
  modalOpen,
  handleClick,
}: {
  modalOpen: boolean;
  handleClick: () => void;
}) {
  return (
    <Dialog
      open={modalOpen}
      PaperProps={{
        style: {
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#1b2127',
          color: 'white',
          border: 'solid white',
          borderRadius: 10,
        },
      }}
    >
      <DialogTitle data-cy="HowToPlayHeader">How to Play</DialogTitle>
      <DialogContent data-cy="HowToPlayContent">
        <span>
          This game is a version of Six Degrees of Kevin Bacon. You are given an
          actor to start with and an actor to end with. Your goal is to try to
          connect the 2 by using movies that share an actor. Depending on the
          actors, a connection could be made in as little as 1 film but the
          maximum amount of movies 6. Making the connection in as few films as
          possible is best. Once you think you have the correct answer, click
          Submit to validate it.
        </span>
        <br />
        <br />
        <span>Example 1: Chris Evans to Chris Hemsworth</span>
        <br />
        <span>
          Solution: The Avengers. Both actors star in The Avengers so the
          connection can be made in one film.
        </span>
        <br />
        <br />
        <span>Example 2: Chris Evans to Chris Pine</span>
        <br />
        <span>
          Solution: The Avengers to Star Trek. The Avengers stars both Chris
          Evans and Chris Hemsworth. Star Trek stars Chris Hemsworth and Chris
          Pine. Therefore, a possible solution uses 2 films.
        </span>
        <br />
        <br />
        <span>
          Tip: If you are looking for an extra challenge, try changing your
          starting actor era in the settings.
        </span>
      </DialogContent>
      <DialogActions>
        <Button
          data-cy="HowToPlayClose"
          variant="contained"
          onClick={handleClick}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
