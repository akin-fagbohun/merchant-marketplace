import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/for-sale">For Sale</Link> |{' '}
      <Link to="/selling">My Listings</Link> | <Link to="/basket">basket</Link> |
    </nav>
  );
};

export default Nav;
