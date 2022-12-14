import { CSSProperties } from 'react';
// import { FooterAd } from '.';

export function Footer() {
  return (
    <footer style={footerStyle} onClick={handleClick} data-cy="Footer">
      {/* <FooterAd /> */}
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
  flexWrap: 'wrap',
};

const imageStyle = {
  width: '1.5em',
  height: '1.5em',
  marginRight: '.5em',
};
