import React from 'react';
import { CSSProperties } from 'react';

export function Footer() {
  React.useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  });
  
  return (
    <footer style={footerStyle} onClick={handleClick} data-cy="Footer">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1140927244903537"
        data-ad-slot="3577758751"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <img style={imageStyle} src="tmdb-logo.svg" alt="TMDB Logo" />
      <div>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </footer>
  );

  function handleClick() {
    window.open('https://www.themoviedb.org/', '_blank');
  }
}

const footerStyle: CSSProperties = {
  color: 'white',
  fontSize: 10,
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1%',
  cursor: 'pointer',
};

const imageStyle = {
  width: '1.5em',
  height: '1.5em',
  marginRight: '.5em',
};
