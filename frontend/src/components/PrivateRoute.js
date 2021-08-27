import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin; // get user info from user signin
  return (
      // we ll return a route
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (   //check user info
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />  //last step 
        )
      }
    ></Route>
  );
}