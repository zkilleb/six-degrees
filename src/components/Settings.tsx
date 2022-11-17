import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { EraToggle } from './EraToggle';

export function Settings({
  settingsModalOpen,
  handleSettingsClick,
}: {
  settingsModalOpen: boolean;
  handleSettingsClick: () => void;
}) {
  return (
    <Dialog
      open={settingsModalOpen}
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
      <DialogTitle data-cy='SettingsModalHeader'>Settings</DialogTitle>
      <DialogContent>
        <EraToggle />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSettingsClick} data-cy='SettingsModalClose'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
