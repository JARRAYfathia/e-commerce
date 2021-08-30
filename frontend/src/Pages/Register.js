import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { Button, Form } from 'react-bootstrap';

export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Merci de vérifier votre mot de passe');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
   <div className="register-page" >
    <Form  onSubmit={submitHandler}>   
    {loading && <Loading></Loading>}
    {error && <MessageBox variant="danger">{error}</MessageBox>}
    <Form.Group controlId="formBasicEmail">
    <Form.Label style={{color:"red",fontSize:"50px", fontFamily:"Times New Roman, Times, serif" }}> Créer votre compte  </Form.Label>
    <p style={{color:"black",fontSize:"15px", fontFamily:"Lucida Console, Courier New, monospace" }}>
      Créer un compte pour que vous puissiez bénéficier de toutes nos fonctionnalités gratuitement et faciliter vos démarches sur notre plateforme. </p>
    </Form.Group>

    <Form.Group controlId="formBasicEmail">
       <Form.Label style={{color:"black",fontSize:"20px", fontFamily:"Times New Roman, Times, serif" }}> Nom du visiteur </Form.Label>
       <Form.Control 
       type="name" 
       name="name" 
       placeholder="Entrer votre nom " 
       required 
       onChange={(e) => setName(e.target.value)} />
    </Form.Group>

    <Form.Group controlId="formBasicEmail">
       <Form.Label style={{color:"black",fontSize:"20px", fontFamily:"Times New Roman, Times, serif" }}> Adresse e-mail </Form.Label>
        <Form.Control 
         type="email" 
         name="email" 
         placeholder="Entrer votre adresse e-mail " 
         required 
         onChange={(e) => setEmail(e.target.value)} />
    </Form.Group>

    <Form.Group controlId="formBasicPassword" style={{color:"black",fontSize:"20px", fontFamily:"Times New Roman, Times, serif" }}>
       <Form.Label>Mot de passe</Form.Label>
        <Form.Control 
          type="password" 
          name="password" 
          placeholder="Entrer votre mot de passe"
          required 
          onChange={(e) => setPassword(e.target.value)}/>
    </Form.Group>

    <Form.Group controlId="formBasicPassword" style={{color:"black",fontSize:"20px", fontFamily:"Times New Roman, Times, serif" }}>
        <Form.Label> Confirmer votre mot de passe</Form.Label>
         <Form.Control 
           type="password" 
           name="password" 
           placeholder="Confirmer votre mot de passe"
           required 
           onChange={(e) => setConfirmPassword(e.target.value)}/>
    </Form.Group>
  <div>
   <p>
   </p>
   </div>    

      <Button 
        className="primary" 
        type="submit">
        Se connecter
      </Button>

    <div>
      <label />
       <h3 style={{color:"black"}}> Avez vous déjà un compte? </h3> {' '}
       <Link to={`/signin?redirect=${redirect}`}> <p style={{fontSize:"20px"}}> Cliquer ici pour se connecter</p></Link>
    </div>
    </Form>
   </div>
  );
}
