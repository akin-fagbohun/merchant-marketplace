import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ForSale = () => {
  const [forSale, setForSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState('');

  useEffect(() => {
    fetch('https://merchant-marketplace.herokuapp.com/api/items')
      .then((response) => response.json())
      .then((data) => {
        setForSale(data.items);
        return data.items;
      })
      .then((dataItems) => {
        const categoryNames = dataItems.map((item) => {
          return item.category_name;
        });
        setCategories([...new Set(categoryNames)]);
        setIsLoading(false);
      });
  }, [forSale]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSorting = (event) => {
    // filter by chosen category this logic doesnt work.
    // fetch('https://merchant-marketplace.herokuapp.com/api/items')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data[0]);
    //     const filteredData = data.items.filter((item) => {
    //       if (item.category_name === event) {
    //         return item;
    //       }
    //     });
    //     return filteredData;
    //   })
    //   .then((filteredData) => {
    //     setForSale(filteredData);
    //   });
  };

  return (
    <main className="for-sale">
      <form>
        <label htmlFor="categories">
          filter by Category
          <select id="categories" value={categories} onChange={handleSorting}>
            <option value=""></option>
            {categories.map((category) => {
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
              <li key={item.item_id}>
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
