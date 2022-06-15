import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/Users';
import { getBasketItems, postNewOrder, deleteCartItem } from '../utils/api';

const Basket = () => {
  // React Global Contexts
  const { loggedIn } = useContext(UserContext);

  // States
  const [basketItems, setBasketItems] = useState([]);
  const [newOrder, setNewOrder] = useState(null);

  // Effects

  // Gets all items in user's basket
  useEffect(() => {
    if (loggedIn) {
      getBasketItems(loggedIn).then((res) => {
        const { items } = res.data;
        setBasketItems(items);
      });
    }
  }, [basketItems, loggedIn]);

  useEffect(() => {
    if (newOrder !== null) {
      postNewOrder(loggedIn, newOrder)
        .then((res) => {
          console.log('inside');
          const { item } = res.data;
          return item;
        })
        .then((item) => {
          console.log(item, '<< in useEffect');
          deleteCartItem(loggedIn, item);

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
    deleteCartItem(loggedIn, item);

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
