import { Paper } from '@mui/material';
import { GameForm } from '../components';
import { colors } from '../constants';

export function Home() {
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
  width: '95%',
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
