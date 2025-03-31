import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import orderRouter from "./routes/order.routes.js"
import productRouter from "./routes/product.routes.js"
import AddToFavRouter from "./routes/addToFav.routes.js"
import AddToCartRouter from "./routes/addToCart.routes.js"

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import Route
app.use('/api/v1/orders',orderRouter);
app.use('/api/v1/products',productRouter)
app.use('/api/v1/addToFav',AddToFavRouter)
app.use('/api/v1/addToCart',AddToCartRouter)


export { app };
