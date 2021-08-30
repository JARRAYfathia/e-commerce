import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductList(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  //create product
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  //delete product
    const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
  
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  
  const createHandler = () => {
    dispatch(createProduct());
  };
  
  return (
    <div>
       <div className="row">
        <h1> Pour avoir un nouveau article</h1>
          <button className="button" onClick={createHandler} ><span> Cliquer ici pour ajouter un article </span></button>
        </div>
           
      {loadingDelete && <Loading></Loading>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <Loading></Loading>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table" id="products">

          <thead>
          <tr >
          <h2 style={{fontFamily:"Times New Roman, Times, serif", fontSize:"30px", color:"black", textAlign:"center"}}> Liste des produits existants</h2>
          </tr>
            <tr style={{fontFamily:"Times New Roman, Times, serif", fontSize:"20px"}}>
              <th> Identifiant</th>
              <th>Titre de l'article</th>
              <th>Prix</th>
              <th>Cartegorie</th>
              <th>Quantite stockée</th>
               <th>Actions possibles</th>
            </tr>
          </thead>

          <tbody style={{fontFamily:"Times New Roman, Times, serif", fontSize:"15px"}}>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                    props.history.push(`/product/${product._id}/edit`)}>
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}>
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