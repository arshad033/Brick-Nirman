import { Router } from "express";
const router = Router()
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


router.route("/create-order").post(verifyJwt,createOrder);
router.route("/get-All-Orders").get(verifyJwt,getAllOrders);