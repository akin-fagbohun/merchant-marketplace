// import axios from 'axios';
import { useState /*useEffect*/ } from 'react';

const Sell = (/*props*/) => {
  // states
  const [name, setName] = useState('');

  // props
  // const { loggedIn, setLoggedIn } = props;

  const handleListing = (event) => {
    event.preventDefault();
    console.log(event, '<<< GETTING EVENT');
    // const { itemName } = event.name;
    // console.log(itemName, '<<< inside handle listing // expect hello');
  };

  // useEffect(() => {
  //   fetch('https://merchant-marketplace.herokuapp.com/api/items')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setForSale(data.items);
  //     })
  //     .then(() => {
  //       fetch('https://merchant-marketplace.herokuapp.com/api/categories')
  //         .then((response) => response.json())
  //         .then((categoryResponse) => {
  //           const { categories } = categoryResponse;

  //           setCategories(categories);
  //           setFilterCategory(categories);
  //           setIsLoading(false);
  //         });
  //     });
  // }, []);

  return (
    <main className="selling">
      <form>
        <label htmlFor="item-name">Item Name</label>
        <input
          id="item-name"
          type="text"
          name="itemName"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label htmlFor="item-description">Description</label>
        <textarea id="item-description" type="text" rows="5" cols="30" name="itemDescription" />

        <label htmlFor="item-image">Image URL</label>
        <input id="item-image" type="url" name="itemImgUrl" />

        <label htmlFor="item-price">price</label>
        <input id="item-price" type="number" name="itemPrice" />

        <input type="submit" value="Submit" onSubmit={(event) => handleListing(event.target)} />
      </form>
      <section>
        <h2>Your Listings</h2>
      </section>
    </main>
  );
};

export default Sell;
