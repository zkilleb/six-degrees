import React, { CSSProperties } from 'react';
import { getActorImages } from '../../api';

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

  React.useEffect(() => {
    async function fetchData() {
      if (id) {
        const result = await getActorImages(id);
        setImagePath(`https://image.tmdb.org/t/p/w342/${result}`);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div style={actorStyle}>
      <div style={headerStyle}>{to ? 'To' : 'Connect'}</div>
      <img style={imageStyle} alt={name} src={imagePath} />
      <div style={subHeaderStyle}>{name}</div>
    </div>
  );
}

const actorStyle: CSSProperties = {
  margin: '2% 10% 5% 10%',
};

const imageStyle = {
  width: 171,
  height: 256,
  borderRadius: 10,
  border: 'solid white',
};

const headerStyle = {
  fontSize: 25,
};

const subHeaderStyle = {
  fontSize: 20,
};
