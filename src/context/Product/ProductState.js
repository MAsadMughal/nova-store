import axios from "axios";
import React, { useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
  let [loading, setLoading] = useState(false)
  const [cart, setCart] = useState({});
  const [cartTotal, setCartTotal] = useState(0);


  const addToCart = (productId, quantity = 1, color) => {
    setLoading(true)
    console.log(color)
    if (quantity >= 1) {
      const data = { productId, quantity, color };
      axios.post(`${process.env.REACT_APP_API_URL}/api/v1/addtocart`, data)
        .then(response => { setCartTotal(response?.data?.total); setCart(response?.data?.cart); })
        .catch(error => {
          console.log(error);
        });
      setLoading(false)
    }
  };


  const getCart = async () => {
    setLoading(true)
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/cart`);
    setCart(data.cart);
    setCartTotal(data.total);
    setLoading(false)
  }


  return (
    <ProductContext.Provider
      value={{
        addToCart, cart, getCart, cartTotal, loading, setLoading
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
