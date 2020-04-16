import api from './apiConfig';

export const getItems = async (userId) => {
  try {
    const response = await api.get(`/items/${userId}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

export const getItem = async (itemId) => {
  try {
    const response = await api.get(`/items/detail/${itemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createItem = async (item, _id) => {
  try {
    const itemData = { ...item, _id };
    const response = await api.post('/items', itemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await api.put(`/items/${id}`, item);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
