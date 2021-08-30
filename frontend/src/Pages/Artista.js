import React from 'react';

const Artista = () => {
    return (
    <div className="home-page">
      <p>
       <div className="titre" style={{fontFamily:" serif", color:"red"}}> Bienvenue chez ARTISTA </div>
        <br/>
        <br/>
          <h2 className="concept"  style={{fontFamily:"fantasy", fontSize:"80px", color:"#b83d83", textAlign:"center"}}> Notre concept</h2>
           <div style={{fontFamily:"cursive", fontSize:"40px", color:" black"}}>
           ARTISTA est une plateforme web spécialisée dans la vente d’oeuvres d’Art Moderne et Contemporain accessible à tous : particuliers, artistes et professionnels.<br/>
           Vous êtes intéressés pour vendre, remplissez et soumettez nous le formulaire.<br/>
           Les annonces sont mises en ligne gratuitement après validation de nos équipes.
           </div> 
      </p>
    </div>
    )
}
export default Artista