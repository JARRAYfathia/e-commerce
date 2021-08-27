//definir les utilites de generateToken
import jwt from 'jsonwebtoken';
export const generateToken = (user) => {
    return jwt.sign( //sign method to generate a token 
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || 'somethingsecret',
      {
        expiresIn: '20d', //date de validation de compte (ouvert)
      }
    );
  };
  
  //middlware pour indiquer les utilisateurs :isAuth
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // on obtient 7 val of token (le seul renvoyé)
      jwt.verify( 
        token,
        process.env.JWT_SECRET || 'somethingsecret',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'ERREUR' });
          } else {
            req.user = decode; //DECODE DONNE LES DONNEES DES UTLISATEUERS
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'ERREUR' });
    }
  };
  
  //secnd middllwr :isAdmin
  //to protect admin route
  //to protct our API for admin like updating pdt or managin an order
  export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) { //to check if user exist and if he is admin!!
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin' });
    }
  };