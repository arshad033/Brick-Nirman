import { Router } from "express";
const router = Router()
import { createOrder, getAllOrders, getOrderById, updateOrder, cancelOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

router.use(verifyJwt)
router.route("/create-order").post(createOrder);
router.route("/get-All-Orders").get(getAllOrders);
router.route("/update-orders/:id").patch(updateOrder);
router.route("/cancel-order/:id").delete(cancelOrder);
router.route("/get-order/:id").get(getOrderById);

export default router;