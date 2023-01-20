import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { paperProps } from '../constants';

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
    <Dialog open={modalOpen} PaperProps={paperProps}>
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
