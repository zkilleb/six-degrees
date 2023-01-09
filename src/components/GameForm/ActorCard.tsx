import React, { CSSProperties } from 'react';
import { Help } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { getActorById, getActorImages } from '../../api';
import { Hints } from '../Hints';

export function ActorCard({
  to,
  name,
  id,
}: {
  to: boolean;
  name?: string;
  id?: number;
}) {
  const [imagePath, setImagePath] = React.useState<string>();
  const [credits, setCredits] = React.useState<any[]>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [hints] = React.useState(localStorage.getItem('hints'));

  React.useEffect(() => {
    async function fetchData() {
      if (id) {
        const result = await getActorImages(id);
        if (hints === 'true') {
          const creditsResponse = await getActorById(id);
          setCredits(creditsResponse);
        }
        setImagePath(`https://image.tmdb.org/t/p/w342/${result}`);
      }
    }
    fetchData();
  }, [id, hints]);

  return (
    <>
      {modalOpen && (
        <Hints
          modalOpen={modalOpen}
          handleClick={handleClick}
          actorName={name ? name : ''}
          credits={credits ? credits : []}
        />
      )}

      <div style={actorStyle} data-cy="ActorCard">
        <div style={headerStyle}>{to ? 'To' : 'Connect'}</div>
        <div style={wrapperStyle}>
          <img style={imageStyle} alt={name} src={imagePath} />
          {hints === 'true' && (
            <div>
              <Tooltip title="Hints">
                <Help
                  data-cy="HintIcon"
                  sx={hintButtonStyle}
                  onClick={showHints}
                />
              </Tooltip>
            </div>
          )}
        </div>
        <div style={subHeaderStyle} data-cy="ActorName">
          {name}
        </div>
      </div>
    </>
  );

  function showHints() {
    setModalOpen(true);
  }

  function handleClick() {
    setModalOpen(!modalOpen);
  }
}

const actorStyle: CSSProperties = {
  margin: '2% 3% 3% 3%',
};

const imageStyle = {
  width: '10.7em',
  height: '16em',
  borderRadius: 10,
  border: 'solid white',
};

const headerStyle = {
  fontSize: 25,
};

const subHeaderStyle = {
  fontSize: 20,
};

const hintButtonStyle = {
  fontSize: 20,
  color: 'white',
  backgroundColor: '#1976d2',
  borderRadius: 10,
  position: 'absolute',
  top: 5,
  left: 5,
};

const wrapperStyle: CSSProperties = {
  position: 'relative',
  display: 'block',
};
