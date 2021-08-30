import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileUser(props) {
//to update profile
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
//sign in
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;        // from usersignin i ll get user info
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
//update
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(detailsUser(userInfo._id));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }, 
    [dispatch, userInfo._id, user]);
    
  const submitHandler = (e) => {
    e.preventDefault();

// dispatch update profile
        if (password !== confirmPassword) { //comparer les mots de passe
        alert(' Confirm Password Please!');
      } else {
        dispatch(updateUserProfile({ userId: user._id, name, email, password }));
      }
  };
  return (
    <div className='profileUserBG'>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 style={{fontFamily:"cursive", fontSize:"30px", color:"orange"}}>
            Et voilà je suis entrain de mettre à jour mon profile!</h1>
        </div>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <Loading></Loading>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success"> Profile Updated Successfully! </MessageBox>
            )}
            <div>
              <label htmlFor="name">Nom complet</label>
              <input
                id="name"
                type="text"
                placeholder="Entrer votre nom complet"
                //update=> we change the name
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="email"> Adresse e-mail</label>
              <input
                id="email"
                type="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            
            <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                placeholder="Entrer votre mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Reentrer votre mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button 
              style={{backgroundColor: "red",
               border: "none",
              color: "white",
              padding: "13px",
              borderRadius: "12px ",
              fontSize: "36px",   
              cursor: "pointer"}} 
              type="submit"
              onClick={() => {
                props.history.push('/profileUpdate')}}>
                Mettre à jour
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}