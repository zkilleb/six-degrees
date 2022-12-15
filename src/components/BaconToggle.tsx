import React, { CSSProperties } from 'react';
import { Switch, FormControl, FormControlLabel } from '@mui/material';

export function BaconToggle() {
  const [checked, setChecked] = React.useState(handleLocalStorage);

  return (
    <div>
      <FormControl style={headerStyle}>
        <FormControlLabel
          data-cy="BaconButtonWrapper"
          checked={checked === 'true' ? true : false}
          control={
            <Switch
              data-cy="BaconButton"
              color="primary"
              onChange={handleChange}
            />
          }
          label="🥓 Bacon Mode"
        />
      </FormControl>
    </div>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked.toString());
    localStorage.setItem('baconMode', event.target.checked.toString());
    window.location.replace(
      `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`,
    );
  }

  function handleLocalStorage() {
    const saved = localStorage.getItem('baconMode');
    return saved ? saved : 'false';
  }
}

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '3%',
  marginBottom: '1%',
};
