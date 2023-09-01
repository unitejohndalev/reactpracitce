import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "./ApiService";

const ApiPractice = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const getProduct = await fetchProducts();
      setProducts(getProduct);
    };
    getProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    const removeProduct = products.filter((product) => product.id !== id);
    setProducts(removeProduct);
  };

  const handleUpdateProduct = async (id) => {
    const updatedProduct = {
      title: "UPDATED PRODUCT",
    };

    const product = await updateProduct(id, updatedProduct);
    setProducts(products.map((p) => (p.id === id ? product : p)));
  };

  const handleCreate = async() => {
    const newProduct = {
      id: products.length + 1,
      title: "NEW PRODUCT CREATED"
    }

    const product = await createProduct(newProduct)
    setProducts([product, ...products])
  }

  console.log(products);

  return (
    <div>
    <button onClick={handleCreate}>Create</button>
      {products.map((product) => {
        return (
          <div key={product.id}>
            {product.title}{" "}
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
            <button onClick={() => handleUpdateProduct(product.id)}>
              Update
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ApiPractice;
