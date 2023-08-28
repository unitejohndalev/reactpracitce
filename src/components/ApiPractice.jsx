import React, { useEffect, useState } from 'react'

const ApiPractice = () => {

//product state
const [product, setProduct] = useState([])

//cart state
const [cart, setCart] = useState([])

useEffect(() => {
    const productList = async () => {
        const res = await fetch("https://fakestoreapi.com/products/1");
        const data = await res.json();
        setProduct(data)
    }
    productList();
}, [])


//add to cart function
const addToCart = (title) => {
    setCart([title])
} 

//remove to cart function
const removeFromCart = () => { 
    setCart([])
}

console.log(product)

const {title} = product

  return (
    <div>{title}
    <button className='border border-black ml-5'
    onClick={() => addToCart(title)}
    >Add to cart</button>


    <div>
        {cart}
       {cart.length > 0 && <button className='border border-black ml-5'
        onClick={() => removeFromCart()}
        >Remove</button>}
    </div>
    </div>
  )
}

export default ApiPractice