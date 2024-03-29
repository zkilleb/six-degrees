import React, { CSSProperties } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../constants';

export function EraToggle() {
  const [era, setEra] = React.useState(handleLocalStorage);

  return (
    <div>
      <div style={headerStyle} data-cy="EraToggleHeader">
        Starting Actor Era
      </div>
      <ToggleButtonGroup
        color="primary"
        value={era}
        exclusive
        onChange={handleChange}
      >
        <StyledToggleButton data-cy="ModernButton" value="modern">
          Modern
        </StyledToggleButton>
        <StyledToggleButton data-cy="BothButton" value="both">
          Both
        </StyledToggleButton>
        <StyledToggleButton data-cy="ClassicButton" value="classic">
          Classic
        </StyledToggleButton>
      </ToggleButtonGroup>
    </div>
  );

  function handleChange(
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) {
    setEra(newAlignment);
    localStorage.setItem('era', newAlignment);
    window.location.replace(
      `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`,
    );
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
  backgroundColor: colors.paperBackground,
  border: 'solid black',
  borderRadius: 10,
  color: 'white',
});

const headerStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '1%',
};
