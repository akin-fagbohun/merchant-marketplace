import axios from 'axios';
import { useState, useEffect } from 'react';

const OrderHistory = (props) => {
  // State
  const [previousOrders, setPreviousOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Props
  const { loggedIn } = props;

  useEffect(() => {
    axios
      .get(`https://merchant-marketplace.herokuapp.com/api/users/${loggedIn}/orders`)
      .then((res) => {
        const { items } = res.data;
        setPreviousOrders(items);
        setIsLoading(false);
      });
  }, [loggedIn]);

  if (isLoading && !loggedIn) {
    return <p>Please log in to view order history...</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Your previous orders</h1>
      <section>
        <ul>
          {previousOrders.map((item) => {
            return (
              <li id={item.item_id} key={item.item_id}>
                <img src={item.img_url} alt={item.item_name}></img>
                <h3>{item.item_name}</h3>
                <p>{item.item_description}</p>
                <p>Purchased for £{item.price}.00</p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default OrderHistory;
