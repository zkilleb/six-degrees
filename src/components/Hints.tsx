import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';

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
    <Dialog
      open={modalOpen}
      PaperProps={{
        style: {
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#1b2127',
          color: 'white',
          border: 'solid white',
          borderRadius: 10,
        },
      }}
    >
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
