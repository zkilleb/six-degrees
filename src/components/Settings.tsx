import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';

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
      <DialogTitle>Settings</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSettingsClick}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
