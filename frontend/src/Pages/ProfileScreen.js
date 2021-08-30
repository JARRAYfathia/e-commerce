import React from 'react';
import {Card,ListGroup,ListGroupItem ,Button,Form} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProfileScreen = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
      <div>
        <div className='profilehome'>
          <Card style={{ width: '25rem' }}>
          <Card.Img variant="top" src="data:image/jpeg;base64,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" />
          <Card.Body>
          <Form.Label htmlFor='firsttName'>First Name :</Form.Label>
           <Card.Title>{userInfo.Name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
          <Form.Label htmlFor='email'>Email :</Form.Label>
          <ListGroupItem>{userInfo.email}</ListGroupItem>
          </ListGroup>
          {/* <Card.Body>
         <Card.Link href="/profile">Update</Card.Link>
         </Card.Body> */}
        </Card> 
        </div>
        <Button  style={{marginLeft:'670Px' ,marginTop:'20Px'}} onClick={() => {
                 props.history.push('/profile')}}>MODIFIER</Button>
        </div>
    )
}
export default ProfileScreen