import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <div data-cy="NotFoundHeader" style={headerStyle}>
        Page Not Found
      </div>
      <div data-cy="NotFoundSubHeader" style={subHeaderStyle}>
        Oops! It looks like you've taken a wrong turn. Feel free to click the
        link below the return to the game!
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

const subHeaderStyle = {
  marginTop: '2%',
  marginBottom: '1%',
  color: 'white',
  fontSize: 20,
};

const linkStyle = {
  paddingLeft: 20,
  textDecoration: 'underline',
  color: 'white',
};
