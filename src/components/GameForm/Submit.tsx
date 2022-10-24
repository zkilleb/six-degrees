import { Button } from '@mui/material';

export function Submit() {
  return (
    <div>
      <Button sx={buttonStyle} variant="contained">
        Submit
      </Button>
    </div>
  );
}

const buttonStyle = {
  marginTop: 10,
};
