import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';



dotenv.config(); 
const app = express();

//add two middlwr 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to connect to mongodb database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/artista', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

//telechargement image
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//to deploy the app we replace this one with ...

/*app.get('/', (req, res) => {
  res.send('Server is ready');
}); */
  //For Heroku
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'frontend/build')));
    app.get("*", (req, res)=> {
      res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
  } else{
    app.get("/", (req, res)=> {
      res.send("API running...");
    })
  }


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 2021;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
