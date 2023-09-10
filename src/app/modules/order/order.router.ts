import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../../enums/users";
import { OrderController } from "./order.controller";

const router = Router();

// create Order
router.post("/", auth(ENUM_USER_ROLE.CUSTOMER), OrderController.createOrder);

// get all Orders
router.get("/", auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);

// get single Order by id
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  OrderController.getSingleOrderById
);

/*
// update single Order by id
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(OrderValidation.update),
  OrderController.updateOrder
);

// delete single Order by id
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), OrderController.deleteOrder);
*/

export const OrderRouter = router;
