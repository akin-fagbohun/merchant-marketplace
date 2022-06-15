import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../contexts/Users';
import { getUsers } from '../utils/api';

const Nav = () => {
  // React Global Contexts
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  // states
  const [allUsers, setAllUsers] = useState([]); // state needs to move to App
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((res) => {
        const { users } = res.data; // array of user objects
        const usernames = users.map((user) => {
          return user.username;
        });
        setAllUsers(usernames);
        setIsLoading(false);
      })
      .then(() => {});
  }, []);

  useEffect(() => {
    if (loggedIn !== null) {
      alert(`Logged in as ${loggedIn}`);
      console.log(loggedIn);
    }
  }, [loggedIn]);

  const handleLogin = (event) => {
    setLoggedIn(event);
  };

  if (!isLoading) {
    return (
      <nav>
        <Link to="/">Home</Link> | <Link to="/for-sale">For Sale</Link> |{' '}
        <Link to="/selling">My Listings</Link> | <Link to="/basket">basket</Link> |
        <select name="users" id="user-select" onChange={(event) => handleLogin(event.target.value)}>
          <option value=""></option>
          {allUsers.map((username) => {
            return (
              <option key={uuidv4} value={username}>
                {username}
              </option>
            );
          })}
        </select>{' '}
        | <Link to="/myaccount">My Account</Link>
      </nav>
    );
  }
};

export default Nav;
