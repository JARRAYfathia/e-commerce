import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
} from './reducers/orderReducers';

import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer, 
    productUpdateReducer,} 
    from './reducers/productReducers';

import { 
    
  userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userRegisterReducer, 
    userSigninReducer, 
    userUpdateProfileReducer,} 
    from './reducers/userReducers';

const initialState = {

    userSignin: {
      userInfo: localStorage.getItem('userInfo')
       ? JSON.parse(localStorage.getItem('userInfo'))
       : null,
    },

    cart: {
      cartItems: localStorage.getItem('cartItems') // catItems: mm valeur utilisé ds cartActions//
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'Virement',
      },
    };
const reducer = combineReducers({
      productList: productListReducer,
      productDetails: productDetailsReducer,
      cart: cartReducer,
      userSignin: userSigninReducer,
      userRegister: userRegisterReducer,
      orderCreate: orderCreateReducer,
      orderDetails: orderDetailsReducer,
      userDetails: userDetailsReducer,
      userUpdateProfile: userUpdateProfileReducer,
      productCreate: productCreateReducer,
      productUpdate: productUpdateReducer,
      productDelete: productDeleteReducer,
      userList: userListReducer,
      userDelete: userDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;