import axios from 'axios';
import { useState, useEffect } from 'react';

const Basket = (props) => {
  // States
  const [basketItems, setBasketItems] = useState([]);
  const [newOrder, setNewOrder] = useState(null);

  // props
  const { loggedIn } = props;

  // Effects

  // Gets all items in user's basket
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
          return item;
        })
        .then((item) => {
          console.log(item);
          axios.delete(
            `https://merchant-marketplace.herokuapp.com/api/users/${loggedIn}/basket/${item.item_id}`
          );
          const newBasket = [...basketItems].splice(basketItems.indexOf(item, 1));
          setBasketItems(newBasket);
          alert(`You putchased ${item.item_name}`);
        });
    }
  }, [loggedIn, newOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helper functions

  // Processes button click to purchase item
  const handlePurchase = (item_id) => {
    setNewOrder(item_id);
  };

  // Processes button click to remove item from basket
  const handleRemoval = (item) => {
    axios.delete(
      `https://merchant-marketplace.herokuapp.com/api/users/${loggedIn}/basket/${item.item_id}`
    );
    const newBasket = [...basketItems].splice(basketItems.indexOf(item, 1));
    setBasketItems(newBasket);
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
            <button value={item} onClick={() => handleRemoval(item)}>
              Remove
            </button>
          </li>
        );
      })}
    </main>
  );
};

export default Basket;
