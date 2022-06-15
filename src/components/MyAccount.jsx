import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/Users';
import { getUserData } from '../utils/api';

const MyAccount = () => {
  // React Global Contexts
  const { loggedIn } = useContext(UserContext);

  // State
  const [user, setUser] = useState([]);

  // Effects

  useEffect(() => {
    getUserData(loggedIn).then((user) => {
      setUser(user);
    });
  }, [loggedIn]);

  return (
    <main>
      <h1>Your Account</h1>
      <div>
        <img src={user.avatar_url} alt={user.username}></img>
        <h2>{user.username}</h2>
        {/* <button value={user.username} onClick={(event) => handleOrderHistory(user.username)}>
          Order History
        </button> */}
        <Link to="/orderhistory">View Order History</Link>
      </div>
    </main>
  );
};

export default MyAccount;
