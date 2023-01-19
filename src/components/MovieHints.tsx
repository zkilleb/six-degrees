import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { colors } from '../constants';

export function MovieHints({
  modalOpen,
  movieName,
  credits,
  handleClick,
}: {
  modalOpen: boolean;
  movieName: string;
  credits: any[];
  handleClick: () => void;
}) {
  return (
    <Dialog
      open={modalOpen}
      PaperProps={{
        style: {
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: colors.paperBackground,
          color: 'white',
          border: 'solid white',
          borderRadius: 10,
        },
      }}
    >
      <DialogTitle data-cy="HintsHeader">
        Popular Actors in {movieName}
      </DialogTitle>
      <DialogContent data-cy="HintsContent">
        {credits.map((actor) => {
          return <div>{actor.name}</div>;
        })}
      </DialogContent>
      <DialogActions>
        <Button data-cy="HintsClose" variant="contained" onClick={handleClick}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
