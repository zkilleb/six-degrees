import { Facebook, Reddit, Twitter } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  TwitterShareButton,
  FacebookShareButton,
  RedditShareButton,
} from 'react-share';

export function Share({
  shareModalOpen,
  handleShareClick,
}: {
  shareModalOpen: boolean;
  handleShareClick: () => void;
}) {
  return (
    <Dialog
      open={shareModalOpen}
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
      <DialogTitle data-cy="ShareModalHeader">Share</DialogTitle>
      <DialogContent sx={wrapperStyle}>
        <div style={contentStyle}>
          <TwitterShareButton
            data-cy="TwitterShareButton"
            url="facebook.com"
            title="Come play Six Degrees of Kevin Bacon with me!"
          >
            <Button variant="contained">
              <Twitter />
            </Button>
          </TwitterShareButton>
        </div>
        <div style={contentStyle}>
          <FacebookShareButton
            data-cy="FacebookShareButton"
            url="facebook.com"
            title="Come play Six Degrees of Kevin Bacon with me!"
          >
            <Button variant="contained">
              <Facebook />
            </Button>
          </FacebookShareButton>
        </div>

        <div style={contentStyle}>
          <RedditShareButton
            data-cy="RedditShareButton"
            url="facebook.com"
            title="Come play Six Degrees of Kevin Bacon with me!"
          >
            <Button variant="contained">
              <Reddit />
            </Button>
          </RedditShareButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleShareClick}
          data-cy="ShareModalClose"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const contentStyle = {
  margin: 5,
};

const wrapperStyle = {
  display: 'flex',
};
