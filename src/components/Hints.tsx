import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { paperProps } from '../constants';

export function Hints({
  modalOpen,
  actorName,
  credits,
  handleClick,
}: {
  modalOpen: boolean;
  actorName: string;
  credits: any[];
  handleClick: () => void;
}) {
  return (
    <Dialog open={modalOpen} PaperProps={paperProps}>
      <DialogTitle data-cy="HintsHeader">
        Popular Credits for {actorName}
      </DialogTitle>
      <DialogContent data-cy="HintsContent">
        {credits.map((credit) => {
          return (
            <div>
              {credit.title}{' '}
              {credit.release_date
                ? '(' + credit.release_date.substring(0, 4) + ')'
                : ''}
            </div>
          );
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
