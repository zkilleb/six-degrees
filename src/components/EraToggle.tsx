import React, { CSSProperties } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../constants';

export function EraToggle() {
  const [era, setEra] = React.useState(handleLocalStorage);
  return (
    <div>
      <div style={headerStyle}>Starting Actor Era</div>
      <ToggleButtonGroup
        color="primary"
        value={era}
        exclusive
        onChange={handleChange}
      >
        <StyledToggleButton value="modern">Modern</StyledToggleButton>
        <StyledToggleButton value="both">Both</StyledToggleButton>
        <StyledToggleButton value="classic">Classic</StyledToggleButton>
      </ToggleButtonGroup>
    </div>
  );

  function handleChange(
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) {
    setEra(newAlignment);
    localStorage.setItem('era', newAlignment);
    window.location.reload();
  }

  function handleLocalStorage() {
    const saved = localStorage.getItem('era');
    return saved ? saved : 'modern';
  }
}

const StyledToggleButton = styled(ToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: colors.tableBackground,
  },
  backgroundColor: '#1b2127',
  border: 'solid black',
  borderRadius: 10,
  color: 'white',
});

const headerStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '1%',
};
