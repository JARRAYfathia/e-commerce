import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth, //middll from utils.js
  expressAsyncHandler(async (req, res) => {
      //voir si on a une commande ou pas
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Panier est vide' }); //we use 400: validation error
    } else { 
      const order = new Order({ //imported from model
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201) //we use 200: success
        .send({ message: 'Nouvelle commande!', order: createdOrder });
    }
  })
);

orderRouter.get(
    '/:id',
    isAuth, //only autho can see order
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) { //if order exist so send it
        res.send(order);
      } else {
        res.status(404).send({ message: 'Pas de commande' });
      }
    })
  );
  

export default orderRouter;