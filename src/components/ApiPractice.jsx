import { useEffect, useState } from "react";
import axios from "axios";

const FAKE_STORE = import.meta.env.VITE_FAKESTORE_API_URL;

//fetch API using axios
const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${FAKE_STORE}?limit=4`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// udpate function
const updateProduct = async(id, updatedProduct) => {
    try {
        const {data} = await axios.put(`${FAKE_STORE}/${id}`, updatedProduct)
        return data;
    }catch (err) {
        console.log(err)
    }
}

//delete function
const deleteProduct = async (id) => {
    try {
        await axios.delete(`${FAKE_STORE}/${id}`)
        return id;
    } catch(err) {
        console.log(err)
    }
}

//create function
const createProduct = async (newProduct) => {
    try {
        const {data} = await axios.post(FAKE_STORE, newProduct);
        return data;
    } catch(err) {
        console.log(err)
    }
}

const ApiPractice = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fakeStore = async () => {
      const postData = await fetchProducts();
      setProducts(postData);
    };
    fakeStore();
  }, []);


  //handle update function
  const handleUpdate = async (id) => {
    const updatedProduct = {
        title: "PRODUCT NAME",
        description: "PRODUCT DESCRIPTION"
    }

    const product = await updateProduct(id, updatedProduct);
    setProducts(products.map((p) => (p.id === id ? product : p)))
  }

  //handle delete function
  const handleDelete = async(id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id))
  }

  //handle create function
  const handleCreate = async() => {
    const newProduct = {
        title: "NEW PRODUCT CREATED",
        description: "NEW PRODUCT DESCRIPTION"
    }

    const product = await createProduct(newProduct);
    setProducts([product, ...products])
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      <p className="text-[2rem] font-bold">FakeStore API</p>
      <button className="border border-black w-[550px] mt-5"
      onClick={handleCreate}
      >
        Create Product
      </button>
      {products.map((product, id) => {
        const { title, description } = product;
        return (
          <div key={id}>
            <div className="mt-2 mb-2 max-w-[550px] flex flex-col gap-y-2">
              <p className="text-[1.3rem] font-bold"> {title}</p>
              <p>{description}</p>
              <div className="flex w-full justify-between gap-x-3">
                <button className="border border-black w-full"
                onClick={() => handleUpdate(product.id)}
                >Update</button>
                <button className="border border-black w-full"
                onClick={() => handleDelete(product.id)}
                >Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApiPractice;
