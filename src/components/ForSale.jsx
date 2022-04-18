import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ForSale = (props) => {
  // States
  const [forSale, setForSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cartItem, setCartItem] = useState(null);

  // props
  const { loggedIn } = props;

  // Effects

  // Gets all items for sale > Gets all categories > Sets some state
  useEffect(() => {
    fetch('https://merchant-marketplace.herokuapp.com/api/items')
      .then((response) => response.json())
      .then((data) => {
        setForSale(data.items);
      })
      .then(() => {
        fetch('https://merchant-marketplace.herokuapp.com/api/categories')
          .then((response) => response.json())
          .then((categoryResponse) => {
            const { categories } = categoryResponse;

            setCategories(categories);
            setFilterCategory(categories);
            setIsLoading(false);
          });
      });
  }, []);

  // filters For Sale items by category
  useEffect(() => {
    if (currentCategory !== null) {
      axios
        .get(
          `https://merchant-marketplace.herokuapp.com/api/items?category_name=${currentCategory}`
        )
        .then((response) => {
          const { items } = response.data;
          console.log(items, '<< destructured items');
          setForSale(items);
        });
    }
  }, [currentCategory]);

  // Adds item to basket
  useEffect(() => {
    if (cartItem !== null) {
      axios.post(`https://merchant-marketplace.herokuapp.com/api/users/${loggedIn}/basket`, {
        item_id: `${cartItem}`,
      });
    }
  }, [cartItem, loggedIn]);

  // Helper functions

  // handles sorting event
  const handleSorting = (event) => {
    console.log(event, '<<< original event');
    setCurrentCategory(event);
  };

  // handles add to cart button click
  const handleAddToCart = (item_id) => {
    setCartItem(item_id);
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
            {filterCategory.map((category) => {
              return (
                <option key={uuidv4} value={category.category_name}>
                  {category.category_name}
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
