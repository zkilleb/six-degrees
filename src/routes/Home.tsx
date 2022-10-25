import React from 'react';
import { Paper } from '@mui/material';
import { GameForm } from '../components';
import { colors } from '../constants';
import { getActorByName } from '../api';

export function Home() {
  React.useEffect(() => {
    async function fetchData() {
      const result = await getActorByName('Cameron Diaz');
      console.log('name', result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <span style={headerStyle}>Six Degrees of Kevin Bacon</span>
      <Paper elevation={1} sx={paperStyle}>
        <GameForm />
      </Paper>
    </div>
  );
}

const paperStyle = {
  backgroundColor: colors.tableBackground,
  width: '90%',
  height: '63em',
  margin: 'auto',
  marginTop: 5,
  borderRadius: 10,
  color: 'white',
};

const headerStyle = {
  fontSize: 75,
  color: 'white',
};
