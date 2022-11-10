import React from 'react';
import { Help, Settings as SettingsIcon } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { HowToPlay, Settings } from '../components';

export function Header() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);

  return (
    <div style={headerStyle}>
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
        <Tooltip title="Settings">
          <div style={settingsStyle}>
            <SettingsIcon onClick={handleSettingsClick} />
          </div>
        </Tooltip>

        <Tooltip title="Help">
          <Help onClick={handleClick} />
        </Tooltip>
      </div>
    </div>
  );

  function handleSettingsClick() {
    setSettingsModalOpen(!settingsModalOpen);
  }

  function handleClick() {
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
  marginRight: '2%',
  display: 'flex',
};

const settingsStyle = {
  paddingRight: '15%',
};
