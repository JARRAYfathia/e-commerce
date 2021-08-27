import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

export default function Commande(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/paiement');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  //toPrice : helper fct
  const toPrice = (num) => Number(num.toFixed(2)); // 8.225 converted to string "8.22" then converted to numbr 8.22
  //prix des articles
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0) //reduce fct to calculate the sum avec valeur par defaut egal à 0
  );
  //frais d livraison
  cart.shippingPrice = cart.itemsPrice > 50 ? toPrice(0) : toPrice(10); // si prix total sup d 50 alors frais=0
  //taxes=10%
  cart.taxPrice = toPrice(0.10 * cart.itemsPrice);
  //PRIX TOTAL
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch(); //  dispatch place order action
  const placeOrderHandler = () => {
    
  dispatch(createOrder({ ...cart, orderItems: cart.cartItems })); //i use all fields of cart and i replace cartItems with orderItems
  };
  
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps> 
      <div className="row top">
        <div className="column2">
          <ul>

            <li>
              <div className="card card-body">
                <h2 style={{fontFamily:"Verdana, Arial, Helvetica, sans-serif", fontSize:"25px", color:"black", textDecoration:"underline"}}>Coordonnées du client:</h2>
                <p>
                  <strong>Nom du client:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Numéro du téléphone:</strong> {cart.shippingAddress.phone} <br />
                  <strong>Adresse du client: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.postalCode}
                  </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2 style={{fontFamily:"Verdana, Arial, Helvetica, sans-serif", fontSize:"25px", color:"black", textDecoration:"underline"}}> Méthode du paiement choisie:</h2>
                <p>
                  <strong> Paiement par:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2 style={{fontFamily:"Verdana, Arial, Helvetica, sans-serif", fontSize:"25px", color:"black", textDecoration:"underline"}}> Les articles choisis: </h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                         <img 
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x {item.price} = {item.qty * item.price} TND
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="column1"> 
          <div className="card card-body">
            <ul>
              <li>
                <h2 style={{fontFamily:"Verdana, Arial, Helvetica, sans-serif", fontSize:"25px", color:"black", textDecoration:"underline"}}>Récapitulatif de la commande:</h2>
              </li>
              <li>
                <div className="row">
                  <div>Les articles sont à:</div>
                  <div>{cart.itemsPrice.toFixed(2)} dinars tunisien </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Frais de livraison</div>
                  <div>{cart.shippingPrice.toFixed(2)} dinars tunisien</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Taxes:</div>
                  <div>{cart.taxPrice.toFixed(2)} TND</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Prix total</strong>
                  </div>
                  <div>
                    <strong>{cart.totalPrice.toFixed(2)} TND</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}>
                  Commander
                </button>
              </li>
              {loading && <Loading></Loading>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}