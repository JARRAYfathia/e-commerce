import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    //commande 
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],

   //expédition
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true },
      postalCode: { type: String, required: true },
      },

    //paiement
    paymentMethod: { type: String, required: true },

    //defining prices 
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    //user creating order
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //status of order
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;