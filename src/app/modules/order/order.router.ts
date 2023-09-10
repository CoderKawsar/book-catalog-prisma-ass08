import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../../enums/users";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";

const router = Router();

// create Order
router.post(
  "/",
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(OrderValidation.create),
  OrderController.createOrder
);

// get all Orders
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllOrders
);

// get single Order by id
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getSingleOrderById
);

export const OrderRouter = router;
