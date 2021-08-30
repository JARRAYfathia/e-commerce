import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';


export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1); /* default value of Qty IS 1*/
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect (() => {
      dispatch (detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => { /* funt to :redirect user to CartScreen*/
    props.history.push(`/cart/${productId}?qty=${qty}`); /* push to change the route */
  };
  return (
    <div>
    {loading ? (<Loading></Loading>)
    : 
    error ? (
 <MessageBox variant="danger">{error}</MessageBox>
) : (

<div>
  <div className="row top">

      <div className="column2">
         <img  src={product.image} alt={product.name} style={{border:"1px solid #ddd"}}></img>
      </div>

      <div className="column1">
          <ul>
            <li> Article: {product.name} </li>
            <li> Categorie: {product.category} </li>
            <li> Prix : {product.price} TND </li>
            <li> Description:  {product.description} </li> 
          </ul>
        </div>
          
      <div className="column1" >
         <div className="card card-body">
           <ul>
             <li>
                <div className="row">
                 <div>Prix: </div>
                 <div className="price">{product.price} TND</div>
                </div>
              </li>
             <li>
                <div className="row">
                  <div>Statut: </div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">En Stock</span>
                    ) : (
                      <span className="danger">Indisponible</span>
                    )}
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Quantité: </div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}>
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block" >
                            Ajouter au panier                    
                        </button>
                      </li>
                    </>
                  )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )}
    </div>
  );
}