import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { colors } from '../constants';
import { BaconToggle } from './BaconToggle';
import { EraToggle } from './EraToggle';
import { HintToggle } from './HintToggle';

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
          backgroundColor: colors.paperBackground,
          color: 'white',
          border: 'solid white',
          borderRadius: 10,
        },
      }}
    >
      <DialogTitle data-cy="SettingsModalHeader">Settings</DialogTitle>
      <DialogContent>
        <EraToggle />
        <BaconToggle />
        <HintToggle />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSettingsClick}
          data-cy="SettingsModalClose"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
