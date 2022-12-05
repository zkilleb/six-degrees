import React from 'react';
import {
  Help,
  Settings as SettingsIcon,
  Share as ShareIcon,
  Coffee,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { HowToPlay, Settings, Share, Support } from '../components';

export function Header() {
  const [playedBefore] = React.useState(localStorage.getItem('playedBefore'));
  const [modalOpen, setModalOpen] = React.useState(
    playedBefore !== 'true' ? true : false,
  );
  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);
  const [shareModalOpen, setShareModalOpen] = React.useState(false);
  const [supportModalOpen, setSupportModalOpen] = React.useState(false);

  return (
    <div style={headerStyle}>
      {supportModalOpen && (
        <Support
          supportModalOpen={supportModalOpen}
          handleSupportClick={handleSupportClick}
        />
      )}

      {shareModalOpen && (
        <Share
          shareModalOpen={shareModalOpen}
          handleShareClick={handleShareClick}
        />
      )}

      {modalOpen && (
        <HowToPlay modalOpen={modalOpen} handleClick={handleClick} />
      )}

      {settingsModalOpen && (
        <Settings
          settingsModalOpen={settingsModalOpen}
          handleSettingsClick={handleSettingsClick}
        />
      )}

      <div style={textWrapperStyle}>
        <Tooltip title="Support Us">
          <div style={settingsStyle} data-cy="HeaderSupport">
            <Coffee onClick={handleSupportClick} />
          </div>
        </Tooltip>

        <Tooltip title="Share">
          <div style={settingsStyle} data-cy="HeaderShare">
            <ShareIcon onClick={handleShareClick} />
          </div>
        </Tooltip>

        <Tooltip title="Settings">
          <div style={settingsStyle} data-cy="HeaderSettings">
            <SettingsIcon onClick={handleSettingsClick} />
          </div>
        </Tooltip>

        <Tooltip title="Help" data-cy="HeaderHelp">
          <Help onClick={handleClick} />
        </Tooltip>
      </div>
    </div>
  );

  function handleSupportClick() {
    setSupportModalOpen(!supportModalOpen);
  }

  function handleShareClick() {
    setShareModalOpen(!shareModalOpen);
  }

  function handleSettingsClick() {
    setSettingsModalOpen(!settingsModalOpen);
  }

  function handleClick() {
    localStorage.setItem('playedBefore', 'true');
    setModalOpen(!modalOpen);
  }
}

const headerStyle = {
  width: '100%',
  height: '3em',
  backgroundColor: '#14181c',
  display: 'flex',
  alignItems: 'center',
};

const textWrapperStyle = {
  color: 'white',
  textDecoration: 'none',
  marginLeft: 'auto',
  marginRight: '15%',
  display: 'flex',
};

const settingsStyle = {
  paddingRight: '15%',
};
