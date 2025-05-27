import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import orderRouter from './routes/order.routes.js';
import productRouter from './routes/product.routes.js';
import AddToFavRouter from './routes/addToFav.routes.js';
import AddToCartRouter from './routes/addToCart.routes.js';
import userRouter from './routes/user.routes.js';
import supplierRouter from './routes/supplier.routes.js';

const allowedOrigins = [
  'https://brick-nirman-frontend.vercel.app',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Optional: Set headers manually for extra control
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));
app.use(cookieParser());

//import Route
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/addToFav', AddToFavRouter);
app.use('/api/v1/addToCart', AddToCartRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/suppliers', supplierRouter);

export { app };
