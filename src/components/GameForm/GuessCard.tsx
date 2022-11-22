import { CSSProperties } from 'react';
import { Tooltip } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';

export function GuessCard({
  name,
  posterPath,
  deleteCallback,
  isLast,
  submitDisabled,
}: {
  name?: string;
  posterPath?: string;
  deleteCallback: () => void;
  isLast?: boolean;
  submitDisabled: boolean;
}) {
  return (
    <div style={cardStyle} data-cy="GuessCard">
      {name ? (
        <div style={wrapperStyle}>
          {posterPath ? (
            <Tooltip title={name}>
              <img
                style={imageStyle}
                alt={name}
                src={`https://image.tmdb.org/t/p/w342/${posterPath}`}
              />
            </Tooltip>
          ) : (
            <div style={altStyle}>{name}</div>
          )}
          {isLast && (
            <Tooltip
              placement="top"
              title={submitDisabled ? '' : 'Delete Movie'}
            >
              <RemoveCircle
                onClick={handleDelete}
                sx={submitDisabled ? disabledIconStyle : iconStyle}
              />
            </Tooltip>
          )}
        </div>
      ) : (
        '?'
      )}
    </div>
  );

  function handleDelete() {
    if (!submitDisabled) deleteCallback();
  }
}

const cardStyle: CSSProperties = {
  width: '1.95em',
  height: '3.3em',
  border: 'solid white',
  margin: '3% 1% 0% 1%',
  textAlign: 'center',
  borderRadius: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 50,
};

const imageStyle = {
  width: '1.95em',
  height: '3.28em',
  borderRadius: 6,
  display: 'block',
};

const iconStyle = {
  color: '#ff4d4d',
  position: 'absolute',
  top: 0,
  right: 0,
};

const disabledIconStyle = {
  color: '#C5C5C5',
  position: 'absolute',
  top: 0,
  right: 0,
};

const wrapperStyle: CSSProperties = {
  position: 'relative',
  display: 'block',
};

const altStyle = {
  fontSize: 10,
};
