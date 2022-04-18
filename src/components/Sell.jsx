// import axios from 'axios';
import { useState, useEffect } from 'react';

const Sell = () => {
  // states
  const initialValues = {
    item_name: '',
    item_description: '',
    image_url: '',
    item_price: 0,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Effects

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && submitted) {
      console.log(formValues);
    }
  }, [formErrors]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helper functions that handle entered data and set various states from form fields

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));

    setSubmitted(true);
  };

  const validate = (values) => {
    const errors = {};
    const urlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;

    if (!values.item_name) {
      errors.item_name = 'An item name is required!';
    }

    if (!values.item_description) {
      errors.item_description = 'An item description is required!';
    }

    if (!values.image_url) {
      errors.image_url = 'Please provide an image URL for your item!';
    } else if (!urlRegex.test(values.image_url)) {
      errors.image_url = 'Please ensure that your URL links to an image!';
    }

    if (!values.item_price) {
      errors.item_price = 'Please set your desired sale price.';
    }

    return errors;
  };

  return (
    <main className="selling">
      <h1>List an Item</h1>
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item-name">Item Name</label>
        <input
          id="item-name"
          type="text"
          name="item_name"
          value={formValues.item_name}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {/* <p>{errors.item_name}</p> */}

        <label htmlFor="item-description">Description</label>
        <textarea
          id="item-description"
          type="text"
          rows="5"
          cols="30"
          name="item_description"
          value={formValues.item_description}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {/* <p>{formErrors.item_description}</p> */}

        <label htmlFor="item-image">Image URL</label>
        <input
          id="item-image"
          type="url"
          name="image_url"
          value={formValues.image_url}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {/* <p>{formErrors.image_url}</p> */}

        <label htmlFor="item-price">price</label>
        <input
          id="item-price"
          type="number"
          name="item_price"
          value={formValues.item_price}
          onChange={handleChange}
          onBlur={handleChange}
        />
        {/* <p>{formErrors.item_price}</p> */}

        <input type="submit" value="Submit" />
      </form>
      <section>
        <h2>Your Listings</h2>
      </section>
    </main>
  );
};

export default Sell;
