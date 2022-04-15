import axios from 'axios';
import { useState, useEffect } from 'react';

const Basket = (props) => {
  // States
  const [basketItems, setBasketItems] = useState([]);
  const [newOrder, setNewOrder] = useState(null);

  // props
  const { loggedIn } = props;

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`https://merchant-marketplace.herokuapp.com/api/users/${loggedIn}/basket`)
        .then((res) => {
          const { items } = res.data;
          setBasketItems(items);
        });
    }
  }, [basketItems, loggedIn]);

  useEffect(() => {
    if (newOrder !== null) {
      axios
        .post(`https://merchant-marketplace.herokuapp.com/api/users/${loggedIn}/orders`, {
          item_id: `${newOrder}`,
        })
        .then((res) => {
          const { item } = res.data;
          console.log(res);
          alert(`You putchased ${item.item_name}`);
        });
    }
  }, [loggedIn, newOrder]);

  const handlePurchase = (item_id) => {
    setNewOrder(item_id);
  };

  return (
    <main>
      <h1>Your Basket</h1>
      {basketItems.map((item) => {
        return (
          <li id={item.item_id} key={item.item_id}>
            <img src={item.img_url} alt={item.item_name}></img>
            <h3>{item.item_name}</h3>
            <p>{item.item_description}</p>
            <p>£{item.price}.00</p>
            <button value={item.item_id} onClick={() => handlePurchase(item.item_id)}>
              Complete Sale
            </button>
            <button>Remove</button>
          </li>
        );
      })}
    </main>
  );
};

export default Basket;
