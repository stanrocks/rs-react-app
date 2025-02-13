import { Link } from 'react-router';

const NotFound = () => {
  return (
    <>
      <h2>Live Long and Prosper!</h2>
      <h3>But not here</h3>
      <h4>Because nothing is here</h4>
      <h5>Page not found</h5>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </>
  );
};

export default NotFound;
