import React from 'react';
import {Link} from 'react-router-dom';



export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card1" style={{ width: '30rem', margin:"20px", marginTop:"0px", borderRadius:"50px"}}>

      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} style={{width: "30rem" , height:'30rem'}} />
      </Link>

    <div className="produit"> 
        <Link to={`/product/${product._id}`}>
          <h2 style={{fontFamily:"Times New Roman, Times, serif", fontSize:"25px", color:"black"}}>
            Article: {product.name}</h2>
          </Link>

        <Link to={`/product/${product._id}`}>
          <h2 style={{fontFamily:"Times New Roman, Times, serif", fontSize:"25px", color:"black"}}>
            Prix: {product.price}</h2>
          </Link>

        <Link to={`/product/${product._id}`}>
          <h2 style={{fontFamily:"Times New Roman, Times, serif", fontSize:"25px", color:"black"}}>
            Categorie: {product.category}</h2>
          </Link>

         </div>
        </div>
       );
}