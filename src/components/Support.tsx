import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { Coffee } from '@mui/icons-material';
import { colors } from '../constants';

export function Support({
  supportModalOpen,
  handleSupportClick,
}: {
  supportModalOpen: boolean;
  handleSupportClick: () => void;
}) {
  return (
    <Dialog
      open={supportModalOpen}
      PaperProps={{
        style: {
          display: 'flex',
          alignItems: 'center',
          backgroundColor: colors.paperBackground,
          color: 'white',
          border: 'solid white',
          borderRadius: 10,
        },
      }}
    >
      <DialogTitle data-cy="SupportHeader">Support</DialogTitle>
      <DialogContent data-cy="SupportContent">
        <span>
          Thank you so much for supporting this little game! If you have enjoyed
          playing, please consider supporting to allow us to continue to improve
          the game and add new features.
        </span>
      </DialogContent>
      <DialogActions>
        <Button
          data-cy="SupportClose"
          variant="contained"
          onClick={handleSupportClick}
        >
          Close
        </Button>
        <Button
          data-cy="SupportButton"
          variant="contained"
          onClick={handleSupportLink}
        >
          Support <Coffee />
        </Button>
      </DialogActions>
    </Dialog>
  );

  function handleSupportLink() {
    window.open('https://ko-fi.com/sixdob');
  }
}
