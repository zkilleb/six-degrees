import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <div data-cy="NotFoundHeader" style={headerStyle}>
        Page Not Found
      </div>
      <Link data-cy="NotFoundLink" style={linkStyle} to="/">
        Return Home
      </Link>
    </div>
  );
}

const headerStyle = {
  color: 'white',
  fontSize: 30,
};

const linkStyle = {
  paddingLeft: 10,
  textDecoration: 'none',
  color: 'white',
};
