import Axios from 'axios';
import {
   CART_ADD_ITEM, 
   CART_REMOVE_ITEM, 
   CART_SAVE_PAYMENT_METHOD, 
   CART_SAVE_SHIPPING_ADDRESS 
  } from '../constants/cartConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`); /* request to our server*/
  dispatch({  /* then dispatch the action*/
    type: CART_ADD_ITEM, /*this action is imported from constants*/
    /* add to cart (redux)*/
    payload: {
      name: data.name, /* here the data is the product*/
      image: data.image,
      categorie: data.category,
      price: data.price,
      countInStock: data.countInStock,
      Artiste: data.artiste,
      product: data._id,
      qty, 
    },
  });
  //add items to localstorage==> la page persiste//
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); // pour conserver les pdts mm apres actualisation//
};

//remove item from cart//
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId }); /* e fix the product to delete*/
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); 
};
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};