// import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { getCategories } from '../utils/api';
import { postItem } from '../utils/api';

const Sell = () => {
  // states
  const initialValues = {
    item_name: '',
    description: '',
    img_url: '',
    price: 0,
    category_name: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effects

  useEffect(() => {
    getCategories().then((categories) => {
      const categoryNames = categories.map((category) => category.category_name);
      setFilterCategories(categoryNames);
      setIsLoading(false);
    });
  }, [formErrors, submitted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helper functions that handle entered data and set various states from form fields

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('🚀 ~ file: Sell.jsx ~ line 36 ~ handleChange ~ value', value);
    console.log('🚀 ~ file: Sell.jsx ~ line 36 ~ handleChange ~ name', name);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    postItem(formValues);
    setSubmitted(true);
  };

  const validate = (values) => {
    const errors = {};
    const urlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;

    if (!values.item_name) {
      errors.item_name = 'An item name is required!';
    }

    if (!values.description) {
      errors.description = 'An item description is required!';
    }

    if (!values.img_url) {
      errors.img_url = 'Please provide an image URL for your item!';
    } else if (!urlRegex.test(values.img_url)) {
      errors.img_url = 'Please ensure that your URL links to an image!';
    }

    if (!values.price) {
      errors.price = 'Please set your desired sale price.';
    }

    return errors;
  };

  if (isLoading) {
    return (
      <main className="selling">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>List an Item</h1>
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <form className="selling" onSubmit={handleSubmit}>
        <label htmlFor="item-name">Item Name</label>
        <input
          id="item-name"
          type="text"
          name="item_name"
          value={formValues.item_name}
          onChange={handleChange}
          onBlur={handleChange}
        />
        <label htmlFor="item-description">Description</label>
        <textarea
          id="item-description"
          type="text"
          rows="5"
          cols="30"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          onBlur={handleChange}
        />
        <label htmlFor="item-image">Image URL</label>
        <input
          id="item-image"
          type="url"
          name="img_url"
          value={formValues.img_url}
          onChange={handleChange}
          onBlur={handleChange}
        />
        <label htmlFor="item-price">Price</label>
        <input
          id="item-price"
          type="number"
          name="price"
          value={formValues.price}
          onChange={handleChange}
          onBlur={handleChange}
        />
        <label htmlFor="category-select">Category</label>
        <select name="category_name" id="category-select" onChange={handleChange}>
          <option value=""></option>
          {filterCategories.map((category) => {
            return (
              <option key={uuidv4} value={category}>
                {category}
              </option>
            );
          })}
        </select>{' '}
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
};

export default Sell;
