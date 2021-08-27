import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Form} from "react-bootstrap"
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin; 

    const dispatch = useDispatch();
    const submitHandler = (e) => { 
      e.preventDefault();
      dispatch(signin(email, password));
    };
    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]); 
    return (
                   
        <Form className="sign-page" onSubmit={submitHandler}>
            <h2 style={{color:"#c73d66",fontSize:"30px", fontFamily:"Times New Roman, Times, serif" }}> Accédez à votre compte</h2>
            
        {loading && <Loading></Loading>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

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
            <div>
          <p>

          </p>
        </div>
        <div>
            <Button 
                className="primary" 
                type="submit">
                Se connecter
            </Button>
            
            </div>
            <div>
            <label />
            <h3 style={{color:"black"}}> Nouveau visiteur? </h3> {' '}
            <Link to={`/register?redirect=${redirect}`}> <p style={{fontSize:"20px"}}> Merci de créer votre compte</p></Link>
            </div>
        </Form>
       
       
        
    )
}

export default Signin