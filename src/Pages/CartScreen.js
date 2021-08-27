import React, { useEffect } from 'react';
import{useDispatch, useSelector} from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id; /* we get the id of product then the qtty */
  const qty = props.location.search  
    ? Number(props.location.search.split('=')[1])
    : 1;
 
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch (addToCart (productId, qty));
      }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) => {
      // delete action
      dispatch(removeFromCart(id));
    };
  
    const checkoutHandler = () => {
      props.history.push('/signin?redirect=shipping');
    };
  return (
  /* panier à gauche */
    <div className="row top">

      <div className="column2"> 
        <h1 className="title"> Articles dans le panier</h1>
        {cartItems.length === 0 ? (
          <MessageBox> Le panier est vide! <Link to="/home"> Choisir un article</Link>
          </MessageBox>
        ) : (
 //caratéristiques des articles achetés (ds panier)
          <ul style={{fontFamily:"Times New Roman, Times, serif", fontSize:"15px"}}>
            {cartItems.map((item) => (
              <li key={item.product}>

                <div className="item">
                
                  <div > 
                   <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>

                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                        addToCart(item.product, Number(e.target.value))
                        )}>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>{item.price} TND </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}>
                      Annulé
                    </button>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        )}
      </div>


      <div className="column1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Prix total ({cartItems.reduce((a, c) => a + c.qty, 0)} articles) : 
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}TND
              </h2>
            </li>

            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}>
                Passer à la caisse
              </button>
            </li>

          </ul>
        </div>
      </div>
      </div>
  );
}