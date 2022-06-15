import axios from 'axios';

const marketplaceApi = axios.create({
  baseURL: 'https://merchant-marketplace.herokuapp.com/api',
});

export const getUsers = () => {
  return marketplaceApi.get('/users');
};

export const getUserData = (loggedIn) => {
  return marketplaceApi.get(`/users/${loggedIn}`).then((res) => {
    const { user } = res.data;
    return user;
  });
};

export const getItems = () => {
  return marketplaceApi.get('/items').then((res) => {
    const { data } = res;
    return data.items;
  });
};

export const postItem = (item) => {
  console.log('🚀 ~ file: api.js ~ line 26 ~ postItem ~ item', item);

  return marketplaceApi.post('/items', item).then((res) => res);
};

export const getCategories = () => {
  return marketplaceApi.get('/categories').then((res) => {
    const { categories } = res.data;
    return categories;
  });
};

export const getCurrentCategory = (currentCategory) => {
  return marketplaceApi
    .get(`/items?category_name=${currentCategory}`)
    .then((response) => response.data);
};

export const getBasketItems = (loggedIn) => {
  return marketplaceApi.get(`/users/${loggedIn}/basket`);
};

export const postCartItem = (loggedIn, cartItem) => {
  return marketplaceApi.post(`/users/${loggedIn}/basket`, {
    item_id: `${cartItem}`,
  });
};

export const postNewOrder = (loggedIn, newOrder) => {
  return marketplaceApi.post(`/users/${loggedIn}/orders`, {
    item_id: `${newOrder}`,
  });
};

export const deleteCartItem = (loggedIn, item) => {
  console.log(item, '<< in APIs');
  marketplaceApi.delete(`/users/${loggedIn}/basket/${item.item_id}`);
};
