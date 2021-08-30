import React from 'react';
import {Card,ListGroup,ListGroupItem ,Button,Form} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProfileHome = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
<div className='profilehomeBG'> 
        <div className='profilehome'>
            
          <Card style={{ width: '45rem', border:"solid" }}>
          <Card.Img variant="top" src="https://st4.depositphotos.com/5934840/27211/v/450/depositphotos_272118648-stock-illustration-business-couple-avatar-profile-picture.jpg"/>
          <ListGroup className="list-group-flush">
          <Form.Label htmlFor='name'  style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px", color:"black"}}>Nom de l'utilisateur: </Form.Label>
          <ListGroupItem style={{fontFamily:"Times New Roman, Times, serif", fontSize:"30px", color:"orange"}}>{userInfo.name}</ListGroupItem>
          </ListGroup>
          <ListGroup className="list-group-flush">
          <Form.Label htmlFor='email'style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px", color:"black"}}>Email: </Form.Label>
          <ListGroupItem style={{fontFamily:"Times New Roman, Times, serif", fontSize:"30px", color:"orange"}}>{userInfo.email}</ListGroupItem>
          </ListGroup>
          <Button 
          style={{backgroundColor: "hsl(350, 65%, 65%)",
          border: "none",
          color: "white",                
          fontSize: "26px",   
          cursor: "pointer"}} 
          type="submit"
           onClick={() => {
                  props.history.push('/profileUpdate')}}>Mettre à jour</Button>
        </Card> 
        </div>
        </div>  
    )
}
export default ProfileHome