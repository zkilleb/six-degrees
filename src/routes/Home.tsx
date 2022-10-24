import React from 'react';
import { Paper } from '@mui/material';
import { GameForm } from '../components';
import { colors } from '../constants';
import { getActorByName, getActorById, getActorImages } from '../api';

export function Home() {
  // React.useEffect(() => {
  //   async function fetchData() {
  //     const result = await getActorByName('Christian Bale');
  //     console.log('name', result);
  //   }
  //   fetchData();
  // }, []);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     const result = await getActorById(5064);
  //     console.log('id', result);
  //   }
  //   fetchData();
  // }, []);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     const result = await getActorImages(5064);
  //     console.log('images', result);
  //   }
  //   fetchData();
  // }, []);

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
  height: 1000,
  margin: 'auto',
  marginTop: 5,
  borderRadius: '10px 10px 10px 10px',
  color: 'white',
};

const headerStyle = {
  fontSize: 75,
  color: 'white',
};
