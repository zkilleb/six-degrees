import React, { CSSProperties } from 'react';
import { Tooltip } from '@mui/material';
import { RemoveCircle, Help } from '@mui/icons-material';
import { getMovieById } from '../../api';
import { MovieHints } from '../MovieHints';

export function GuessCard({
  name,
  posterPath,
  deleteCallback,
  isLast,
  submitDisabled,
  id,
}: {
  name?: string;
  posterPath?: string;
  deleteCallback: () => void;
  isLast?: boolean;
  submitDisabled: boolean;
  id?: number;
}) {
  const [cast, setCast] = React.useState<any[]>();
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (id && localStorage.getItem('hints') === 'true') {
      getMovieById(id).then((resCast) => {
        setCast(resCast.slice(0, 5));
      });
    }
  }, [id]);

  return (
    <>
      {modalOpen && (
        <MovieHints
          handleClick={handleClick}
          modalOpen={modalOpen}
          credits={cast ? cast : []}
          movieName={name ? name : ''}
        />
      )}
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
            {localStorage.getItem('hints') === 'true' && (
              <Tooltip placement="top" title={'Hints'}>
                <Help onClick={handleClick} sx={helpStyle} />
              </Tooltip>
            )}
          </div>
        ) : (
          '?'
        )}
      </div>
    </>
  );

  function handleDelete() {
    if (!submitDisabled) deleteCallback();
  }

  function handleClick() {
    setModalOpen(!modalOpen);
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
  height: '3.3em',
  borderRadius: 6,
  display: 'block',
};

const iconStyle = {
  color: '#ff4d4d',
  backgroundColor: 'white',
  borderRadius: 10,
  position: 'absolute',
  top: 0,
  right: 0,
};

const helpStyle = {
  backgroundColor: '#1976d2',
  borderRadius: 10,
  color: 'white',
  position: 'absolute',
  top: 0,
  left: 0,
};

const disabledIconStyle = {
  color: '#C5C5C5',
  backgroundColor: 'white',
  borderRadius: 10,
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
