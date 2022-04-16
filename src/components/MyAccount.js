import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MyAccount = (props) => {
  // State
  const [user, setUser] = useState([]);

  // Props
  const { loggedIn } = props;

  // Effects

  useEffect(() => {
    axios.get(`https://merchant-marketplace.herokuapp.com/api/users/${loggedIn}`).then((res) => {
      const { user } = res.data;
      setUser(user);
    });
  }, [loggedIn]);

  // Helper funtions

  // Processes button to get user order history
  // const handleOrderHistory = (username) => {
  //   console.log(username);
  // };

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
