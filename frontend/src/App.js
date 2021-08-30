import './App.css';
import { Route} from 'react-router';
import { Switch } from 'react-router';
import Error from './Pages/Error';
import Home from './Pages/Home';
import Artista from './Pages/Artista';
import Register from './Pages/Register';
import Signin from './Pages/Signin';
import Contact from './Pages/Contact';
import ProductScreen from './Pages/ProductScreen';
import CartScreen from './Pages/CartScreen';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import ShippingAddressScreen from './Pages/ShippingAddressScreen';
import OrderScreen from './Pages/OrderScreen';
import MethodPaiement from './Pages/MethodPaiement';
import Commande from './Pages/Commande';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import ProductList from './Pages/ProductList';
import EditProduct from './Pages/EditProduct';
import UsersUsers from './Pages/UsersUsers';
import ProfileHome from './components/ProfileHome';
import ProfileUser from './Pages/ProfileUser';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin; //get user info
  const dispatch = useDispatch();
  const signoutHandler = () => {
        dispatch(signout());
  };
  
return (
  <div className="App">
    <div className="grid-container">
    <header className="row">
        <div>
        <Link to="/artista" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px", color:"white"}}>Comment ca marche?</Link>
        <Link to="/home" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px", color:"white"}}>Nos produits</Link>
        <Link to="/contact" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px", color:"white"}}>Contact</Link>
        <Link  to="/contact" style={{fontFamily:" Brush Script MT, Brush Script Std, cursive",fontSize:"40px", color:"gold"}}> Artista</Link>
         {/* panier du client */}
          <Link to="/cart" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px", color:"white"}}>
             Mon panier
             {cartItems.length > 0 && ( 
                <span className="badge">{cartItems.length}</span>
              )}
           </Link>
           <Link to="/register" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px", color:"white"}}>Inscription</Link>
            {/* user view */}
          {userInfo ? (
              <div className="dropdown" >
                <Link to="#" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"25px", color:"black"}}>
                 {userInfo.name} {' '}
                </Link>
                <ul className="dropdown-content">
                       <li>
                         <Link to="/profile"style={{fontFamily:"Times New Roman, Times, serif", fontSize:"15px", color:"red"}}>
                            Mon profile</Link>
                       </li>
                       <li>
                         <Link to="/#signout" onClick={signoutHandler} style={{fontFamily:"Times New Roman, Times, serif", fontSize:"15px", color:"red"}}>
                           Sign Out  </Link>
                        </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px", color:"white"}}>
                Sign In</Link>
            )}
     {/* admin view */}
     {/* check if user exist and if user is admin*/}
            {userInfo && userInfo.isAdmin && ( 
              <div className="dropdown">
                <Link to="#admin" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"25px", color:"black"}}>
                  Admin {' '}
                </Link>
                <ul className="dropdown-content">
                  <li> <Link to="/productlist" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"15px", color:"red"}}>Produits</Link> </li>
                 <li>  <Link to="/userlist" style={{fontFamily:"Times New Roman, Times, serif", fontSize:"15px", color:"red"}}>Clients</Link> </li>
                </ul>
              </div>
            )}           
        </div>
    </header>
    <main>
    <div>
    </div>
    
      <Switch>
        <Route exact path="/" component={Artista}/>
        <Route path="/artista" component={Artista}/>
        <Route path="/cart/:id?" component={CartScreen}/>
        <Route path="/home" component={Home}/>
        <Route path="/product/:id" render={(props) => <ProductScreen {...props}/>} exact />
        <Route
            path="/product/:id/edit"
            component={EditProduct}
            exact
          ></Route>
        <Route path="/contact" component={Contact}/>
        <Route path="/register" component={Register}/>
        <Route path="/signin" component={Signin} />
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/paiement" component={MethodPaiement}></Route>
        <Route path="/commander" component={Commande}></Route>
        <PrivateRoute path="/profile" component={ProfileHome}></PrivateRoute>
        <Route path="/profileUpdate" component={ProfileUser}></Route>
        <AdminRoute
            path="/productlist"
            component={ProductList}
          ></AdminRoute>
        <AdminRoute
            path="/userlist"
            component={UsersUsers}
          ></AdminRoute>
      
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/*" component={Error}/>
      </Switch>
    </main>

    <footer className="row center">Copyirght © 2021, All rigths reserved JARRAY.F.</footer>

    </div>
    </div>
  );
}
export default App;
