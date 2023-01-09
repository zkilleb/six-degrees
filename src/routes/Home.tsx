import { Paper } from '@mui/material';
import { GameForm } from '../components';
import { colors } from '../constants';

export function Home() {
  return (
    <div>
      <img
        onClick={handleBannerClick}
        data-cy="TitleBanner"
        style={headerStyle}
        src="banner-logo.png"
        alt="Logo"
      />
      <Paper elevation={1} sx={paperStyle}>
        <GameForm />
      </Paper>
    </div>
  );

  function handleBannerClick() {
    window.location.replace(
      `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`,
    );
  }
}

const paperStyle = {
  backgroundColor: colors.tableBackground,
  width: '95%',
  height: '63em',
  margin: 'auto',
  marginTop: '1%',
  borderRadius: 10,
  color: 'white',
};

const headerStyle = {
  marginTop: '1%',
  width: '40%',
};
