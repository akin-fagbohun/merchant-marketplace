// import axios from 'axios';
import { useState } from 'react';

const Sell = () => {
  const [name, setName] = useState('');

  const handleListing = (event) => {
    event.preventDefault();
    console.log(event);
    // const { itemName } = event.name;
    // console.log(itemName, '<<< inside handle listing // expect hello');
  };

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
    </main>
  );
};

export default Sell;
