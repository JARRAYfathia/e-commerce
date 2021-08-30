import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailsOrder } from '../actions/orderActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
  
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);
    
  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div>
      
      </div>
      <div className="row top">
        <div className="column2">
          <ul>
            <li>
              <div className="card card-body">
              <h1 style={{color:"gray"}}> Commande numéro: {order._id}</h1>
                <h2 style={{color:"black", fontFamily:"cursive", textDecoration:"underline"}}>Coordonnées du client</h2>
                <p>
                  <strong>Nom du client:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Numéro du téléphone:</strong> {order.shippingAddress.phone} <br />
                  <strong>Adresse du client: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.postalCode}
                  </p>
                 
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2 style={{color:"black", fontFamily:"cursive", textDecoration:"underline"}}> Méthode du paiement choisie:</h2>
                <p>
                  <strong> Paiement par:</strong> {order.paymentMethod}
                </p>
               
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2 style={{color:"black", fontFamily:"cursive", textDecoration:"underline"}}> Les articles choisis: </h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                <h2 style={{color:"black", fontFamily:"fantasy", fontSize:"28px"}}>Récapitulatif de la commande:</h2>
              </li>
              <li>
                <div className="row">
                  <div style={{color:"black", fontFamily:"cursive", textDecoration:"underline", fontSize:"22px"}}>Les articles sont à:</div>
                  <div style={{color:"#310101", fontFamily:"Times New Roman, Times, serif", fontSize:"20px"}}>{order.itemsPrice.toFixed(2)} dinars tunisien </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div style={{color:"black", fontFamily:"cursive", textDecoration:"underline", fontSize:"22px"}}>Frais de livraison</div>
                  <div style={{color:"#310101", fontFamily:"Times New Roman, Times, serif", fontSize:"20px"}}>{order.shippingPrice.toFixed(2)} dinars tunisien</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div style={{color:"black", fontFamily:"cursive", textDecoration:"underline", fontSize:"22px"}}>Taxes:</div>
                  <div style={{color:"#310101", fontFamily:"Times New Roman, Times, serif", fontSize:"20px"}}>{order.taxPrice.toFixed(2)} TND</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div style={{color:"black", fontFamily:"cursive", textDecoration:"underline", fontSize:"22px"}}>
                    <strong > Prix total</strong>
                  </div>
                  <div style={{color:"#310101", fontFamily:"Times New Roman, Times, serif", fontSize:"20px"}}>
                    <strong>{order.totalPrice.toFixed(2)} TND</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}