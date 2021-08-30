import React, { useEffect} from 'react';
import Product from '../components/Product';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect (()=> {
    dispatch (listProducts());
  }, [dispatch]);
    
return (
  <div>
    {loading ? (<Loading></Loading>)
     : 
    error ? (
      <MessageBox variant="danger">{error}</MessageBox>
      ) : (
   <div className="home-page">
    <div className="row center">
        {products.map((product) => (
           <Product key={product._id} product={product}></Product> ))}
    </div>
   </div>
   )}
 </div>
 );} 
export default Home