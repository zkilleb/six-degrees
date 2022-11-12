import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../constants';

export function EraToggle() {
  const [era, setEra] = React.useState(handleLocalStorage);
  return (
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
  );

  function handleChange(
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) {
    setEra(newAlignment);
    localStorage.setItem('era', newAlignment);
  }

  function handleLocalStorage() {
    const saved = localStorage.getItem('name');
    const initialValue = typeof saved === 'string' ? JSON.parse(saved) : saved;
    return initialValue || 'modern';
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
