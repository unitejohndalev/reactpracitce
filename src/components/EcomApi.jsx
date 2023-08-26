// 1. create a api call
// 2. store api in a state

import { useEffect, useState } from "react";

const EcomApi = () => {
  const [fakeStore, setFakeStore] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const myEcom = async () => {
      const res = await fetch("https://fakestoreapi.com/products/");
      const data = await res.json();
      setFakeStore(data);
    };
    myEcom();
  }, []);

  //   const {title} = fakeStore //use it when only one product is
  // specified in the "https://fakestoreapi.com/products/1"



  return (
    <div>
      {fakeStore.map((store, id) => {
        const { title } = store;
        return (
          <div key={id}>
            {title}
            <button className="border border-black">add</button>
          </div>
        );
      })}

      <div className="mt-10">PRODUCT CART</div>
    </div>
  );
};

export default EcomApi;
