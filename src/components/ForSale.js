import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ForSale = () => {
  const [forSale, setForSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSorting = (event) => {
    // event.preventDefault();
    // setIsLoading(true);
    console.log(event, '<<< original event');
    setCurrentCategory(event);
    // axios
    //   .get(`https://merchant-marketplace.herokuapp.com/api/items?category_name=${event}`)
    //   .then((response) => {
    //     const { items } = response.data;
    //     console.log(items, '<< destructured items');
    //     setCategories(items);
    //   });
  };

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
              <li key={uuidv4}>
                <img src={item.img_url} alt={item.item_name}></img>
                <h3>{item.item_name}</h3>
                <p>{item.item_description}</p>
                <p>£{item.price}.00</p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default ForSale;
