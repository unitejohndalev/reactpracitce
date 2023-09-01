import React from "react";
import axios from "axios";

const FAKESTORE = import.meta.env.VITE_FAKESTORE_API_URL;

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${FAKESTORE}?limit=3`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${FAKESTORE}/${id}`);
    return id;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const { data } = await axios.put(`${FAKESTORE}/${id}`, updatedProduct);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async (newProduct) => {
  try {
    const {data} = await axios.post(FAKESTORE, newProduct)
    return data
  }catch(err) {
    console.log(err)
  }
}
