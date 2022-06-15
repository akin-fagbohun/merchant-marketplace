import { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../contexts/Users';
import { getItems, getCategories, getCurrentCategory, postCartItem } from '../utils/api';

const ForSale = () => {
  // React (Global) Contexts
  const { loggedIn } = useContext(UserContext);

  // States
  const [forSale, setForSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategories, setFilterCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cartItem, setCartItem] = useState(null);

  // Effects

  // Gets all items for sale > Gets all categories > Sets some state
  useEffect(() => {
    getItems()
      .then((res) => {
        setForSale(res);
      })
      .then(() => {
        getCategories().then((categories) => {
          const categoryNames = categories.map((category) => category.category_name);
          setFilterCategories(categoryNames);
          setIsLoading(false);
        });
      });
  }, []);

  // filters For Sale items by category
  useEffect(() => {
    if (currentCategory !== null) {
      getCurrentCategory(currentCategory).then((data) => {
        const { items } = data;
        setForSale(items);
      });
    }
  }, [currentCategory]);

  // Adds item to basket
  useEffect(() => {
    if (cartItem !== null) {
      postCartItem(loggedIn, cartItem);
    }
  }, [cartItem, loggedIn]);

  // handles sorting event
  const handleSorting = (event) => {
    setCurrentCategory(event);
  };

  // handles add to cart button click
  const handleAddToCart = (item_id) => {
    loggedIn ? setCartItem(item_id) : alert('Please log in to make a purchase.');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="for-sale">
      <form>
        <label htmlFor="categories">
          filter by Category
          <select
            name="categories"
            id="category-select"
            onChange={(event) => handleSorting(event.target.value)}
          >
            <option value=""></option>
            {filterCategories.map((category) => {
              return (
                <option key={uuidv4} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </label>
      </form>

      <section>
        <ul>
          {forSale.map((item) => {
            return (
              <li id={item.item_id} key={item.item_id}>
                <img src={item.img_url} alt={item.item_name}></img>
                <h3>{item.item_name}</h3>
                <p>{item.item_description}</p>
                <p>£{item.price}.00</p>
                <button value={item.item_id} onClick={() => handleAddToCart(item.item_id)}>
                  Add to Basket
                </button>
                <button>Buy Now</button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default ForSale;
