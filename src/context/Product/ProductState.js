import axios from "axios";
import React, { useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
  const [cart, setCart] = useState({});
  const [cartTotal, setCartTotal] = useState(0);


  const addToCart = (productId, quantity = 1) => {
    const data = { productId, quantity };
    axios.post(`${process.env.host}/api/v1/addtocart`, data)
      .then(response => { setCartTotal(response?.data?.total); setCart(response?.data?.cart); })
      .catch(error => { console.log(error); });
  };


  const getCart = async () => {
    const { data } = await axios.get(`${process.env.host}/api/v1/cart`);
    setCart(data.cart);
    setCartTotal(data.total);
  }


  return (
    <ProductContext.Provider
      value={{
        addToCart, cart, getCart, cartTotal
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
