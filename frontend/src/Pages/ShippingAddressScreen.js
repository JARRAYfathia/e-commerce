import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin); 
  const { userInfo } = userSignin; //user info from details of user sign in 
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  //if user dnt signin (history) he cnt pass to payment and he wll redirected to signin
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, phone,postalCode })
    );
    props.history.push('/paiement');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 style={{color:"orange"}}> Merci d'avoir entrer vos coordonnées avec précision </h1>
        </div>
        <div>
          <label htmlFor="fullName"> Nom copmlet:</label>
          <input
            type="text"
            id="fullName"
            placeholder="Tpaer votre nom"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Adresse exacte:</label>
          <input
            type="text"
            id="address"
            placeholder="Entrer votre adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phone"> Votre numéro de téléphone:</label>
          <input
            type="tel"
            id="telNo" 
            name="telNo" 
            placeholder="Ecrire votre numéro de téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
        </div>
      
        <div>
          <label htmlFor="postalCode"> Code postal:</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
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