import { CSSProperties } from 'react';
import { Tooltip } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';

export function GuessCard({
  name,
  posterPath,
  deleteCallback,
  isLast,
}: {
  name?: string;
  posterPath?: string;
  deleteCallback: () => void;
  isLast?: boolean;
}) {
  return (
    <div style={cardStyle}>
      {name ? (
        <Tooltip title={name}>
          <div style={wrapperStyle}>
            {posterPath ? (
              <img
                style={imageStyle}
                alt={name}
                src={`https://image.tmdb.org/t/p/w342/${posterPath}`}
              />
            ) : (
              <div style={altStyle}>{name}</div>
            )}
            {isLast && <RemoveCircle onClick={handleDelete} sx={iconStyle} />}
          </div>
        </Tooltip>
      ) : (
        '?'
      )}
    </div>
  );

  function handleDelete() {
    deleteCallback();
  }
}

const cardStyle: CSSProperties = {
  width: '1.95em',
  height: '100%',
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
  height: '3.2em',
  borderRadius: 6,
  display: 'block',
};

const iconStyle = {
  color: '#ff4d4d',
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
