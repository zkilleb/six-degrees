import React, { CSSProperties } from 'react';
import { Switch, FormControl, FormControlLabel } from '@mui/material';

export function HintToggle() {
  const [checked, setChecked] = React.useState(handleLocalStorage);

  return (
    <div>
      <FormControl style={headerStyle}>
        <FormControlLabel
          data-cy="HintButtonWrapper"
          checked={checked === 'true' ? true : false}
          control={
            <Switch
              data-cy="HintButton"
              color="primary"
              onChange={handleChange}
            />
          }
          label="❓ Hints"
        />
      </FormControl>
    </div>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked.toString());
    localStorage.setItem('hints', event.target.checked.toString());
    window.location.reload();
  }

  function handleLocalStorage() {
    const saved = localStorage.getItem('hints');
    return saved ? saved : 'false';
  }
}

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '3%',
  marginBottom: '1%',
};
