import { Router } from "express";
const router = Router()
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

router.use(verifyJwt)
router.route("/create-order").post(createOrder);
router.route("/get-All-Orders").get(getAllOrders);
router.route("/update-orders").put(getAllOrders);
router.route("/delete-orders").delete(getAllOrders);
router.route("/get-order/:id").get(getOrderById);

export default router;