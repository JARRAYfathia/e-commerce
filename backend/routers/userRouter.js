import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAuth, isAdmin } from '../utils.js';

const userRouter = express.Router();

/* get users*/
//sending list of users to frontend 
userRouter.get(
  '/', //will be added at the end of url 
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({}); //find to get list of products (all)
    res.send(users);
  })
); 

userRouter.get(
  '/users',
  expressAsyncHandler(async (req, res) => {
     
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);
// get users
userRouter.get(
  '/:id', 
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
); 

//sign in
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email }); //check email in the database
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) { //compare the email in the databse with the new one
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user), //token generated by jsonwebtoken
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);
//register 
userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({ //userModel
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10), //here salt=10 // hashedPassword have two parameters pwd and salt
    });
    const createdUser = await user.save(); //pass from new user to created user //save the user
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

//user profile
//get uers by id
userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
//update profile fct
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) { //if user exist
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10); //10: to generate the auto salt
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

// delete users
userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      const deleteUser = await user.remove();
      res.send({ message: 'user Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'user Not Found' });
    }
  })
);

export default userRouter;