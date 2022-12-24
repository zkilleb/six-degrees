import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { Stat } from '../classes';
import { parseStats, formatTimer } from '../util';

export function Stats({
  statModalOpen,
  handleStatClick,
}: {
  statModalOpen: boolean;
  handleStatClick: () => void;
}) {
  const [stats] = React.useState(localStorage.getItem('stats'));
  const [parsedStats] = React.useState<Stat | undefined>(parseStats(stats));

  return (
    <Dialog
      open={statModalOpen}
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
      <DialogTitle data-cy="StatModalHeader">Statistics</DialogTitle>
      <DialogContent data-cy="StatModalBody" sx={contentStyle}>
        {parsedStats ? (
          <>
            <div>Games Played: {parsedStats.gamesPlayed}</div>
            <div>Wins: {parsedStats.wins}</div>
            <div>
              Winning %: {(parsedStats.wins / parsedStats.gamesPlayed) * 100}%
            </div>
            <div>Longest Streak: {parsedStats.longestStreak}</div>
            {parsedStats.fastestTime ? (
              <div>Fastest Win: {formatTimer(parsedStats.fastestTime)}</div>
            ) : null}
          </>
        ) : (
          <div>No Stats At This Time</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleStatClick}
          data-cy="StatModalClose"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const contentStyle = {
  alignItems: 'center',
  textAlign: 'center',
};