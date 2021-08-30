import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function EditProduct(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  
//update product
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
        props.history.push('/productlist');
      }
      if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
}, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    //  dispatch update product
    dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          countInStock,
          description,
        })
      );
  };
  // upload product image 
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        {loadingUpdate && <Loading></Loading>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <h1> Modifier les caractéristiques de l'article numéro: {productId}</h1>

          <div>
              <label htmlFor="name"> Nom de l'article</label>
              <input
                id="name"
                type="text"
                placeholder="Entrer le nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
           
          <div>
              <label htmlFor="image">Choisir l'image convenable de larticle</label>
              <input
                id="image"
                type="text"
                placeholder="Entrer le chemin"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <Loading></Loading>}
            
            </div>
                               
            <div>
              <label htmlFor="category">Categorie</label>
              <input
                id="category"
                type="text"
                placeholder="Entrer la categorie convenable"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="price">Prix proposé</label>
              <input
                id="price"
                type="text"
                placeholder="Entrer le prix"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>        
            
            <div>
              <label htmlFor="countInStock">Quantité stockée</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Entrer la quantité disponible"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="decrire l'article"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label></label>
              <button className="primary" type="submit">
                Mettre à jour
              </button>
            </div>

          </>
        )}
      </form>
    </div>
  );
}