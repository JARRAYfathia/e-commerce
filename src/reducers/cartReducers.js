import { 
  CART_ADD_ITEM, 
  CART_EMPTY, 
  CART_REMOVE_ITEM, 
  CART_SAVE_PAYMENT_METHOD, 
  CART_SAVE_SHIPPING_ADDRESS
 } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {

  switch (action.type) {
    case CART_ADD_ITEM: /* first step is to add payload*/
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product); 
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { 
            ...state,
            cartItems: [...state.cartItems, item] };
      }
      case CART_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product !== action.payload), /* Filtring out the product that its id is equal to action.payload*/ 
        /*cartReducer wll update the redux and remove the product (x) from cart items*/
        };
      //shipping
      case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
      //paiement
      case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
     // CE CAS: panier vide (dernier option)
      case CART_EMPTY:
        return { ...state, cartItems: [] }; //retern empty array
    default:
      return state;
  }
};