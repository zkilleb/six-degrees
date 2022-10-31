import { CSSProperties } from "react";

export function Footer() {
  return (
    <footer style={footerStyle}>
      <img style={imageStyle} src="tmdb-logo.svg" alt="TMDB Logo" />
      <div>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </footer>
  );
}

const footerStyle: CSSProperties = {
  color: 'white',
  fontSize: 10,
  display: 'flex',
  justifyContent: 'center',
};

const imageStyle = {
  width: '1.5em',
  height: '1.5em',
  marginRight: '.5em',
};
