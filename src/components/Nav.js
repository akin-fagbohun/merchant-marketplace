import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Nav = () => {
  const [allUsers, setAllUsers] = useState([]); // state needs to move to App
  const [loggedIn, setLoggedIn] = useState(null); // state needs to move to App
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://merchant-marketplace.herokuapp.com/api/users')
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
        </select>
      </nav>
    );
  }
};

export default Nav;
