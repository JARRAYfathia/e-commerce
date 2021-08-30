import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET } from '../constants/userConstants';

export default function UsersUsers(props) {
    const userList = useSelector((state) => state.userList);
    const { 
      loading,
      error, 
      users, 
    } = userList;
  
    //delete users
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
  
      if (successDelete) {
        dispatch({ type: USER_DELETE_RESET });
      }
  
      dispatch(listUsers());
    }, [ dispatch, props.history, successDelete]);
  
    const deleteHandler = (user) => {
      if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteUser(user._id));
      }
    };   
return (
  <div>
    <div className="row">
       <h2 style={{fontFamily:"Times New Roman, Times, serif", fontSize:"30px", color:"black", textAlign:"center"}}> Liste des clients</h2>
    </div>
           {loadingDelete && <Loading/>}
           {errorDelete && <MessageBox  variant="danger">{errorDelete}</MessageBox >}
           {loading ? (
           <Loading></Loading>
           ) : error ? (
           <MessageBox variant="danger">{error}</MessageBox>
           ) : (
          <table className="table" id="products">
            <thead>
              <tr style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px"}}>
                <th> Identifiant</th>
                <th>Nom de l'utilisateur</th>
                <th>Email de l'utilisateur</th>
                <th>Actions possibles</th>
              </tr>
            </thead>
            <tbody style={{fontFamily:"Times New Roman, Times, serif", fontSize:"15px"}}>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>               
                  <td>  
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(user)}>
                     Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
