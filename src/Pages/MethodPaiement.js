import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function MethodPaiement(props) {
 
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Virement');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/commander');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 style={{color:"orange"}}>Choisissez la méthode de paiement que vous convient:</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="virement"
              value="virement bancaire"
              name="paymentMethod"
              required
              checked   //virement est selectionné par defaut
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="virement Bancaire"> Virement Bancaire</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="cheque"
              value="cheque"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Chèque</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
}