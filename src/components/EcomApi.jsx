// 1. create a api call
// 2. store api in a state

import { useEffect, useState } from "react";

const EcomApi = () => {
  const [fakeStore, setFakeStore] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const myEcom = async () => {
      const res = await fetch("https://fakestoreapi.com/products/1");
      const data = await res.json();
      setFakeStore(data);
    };
    myEcom();
  }, []);

  const { title } = fakeStore;

  //add to cart function
  const addToCart = (title) => {
    setCart([title]);
  };

  //remove to cart function
  const removeToCart = () => {
    setCart([]);
  };

  return (
    <div>
      PRODUCTS
      <p>{title}</p>
      <button className="border border-black" onClick={() => addToCart(title)}>
        ADD to cart
      </button>
      <div className="mt-10">
        PRODUCT CART
        <p>{cart}</p>
        {cart.length > 0 && (
          <button
            className="border border-black"
            onClick={() => removeToCart()}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default EcomApi;
