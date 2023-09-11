"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const users_1 = require("../../../enums/users");
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = (0, express_1.Router)();
// create Order
router.post("/", (0, auth_1.default)(users_1.ENUM_USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(order_validation_1.OrderValidation.create), order_controller_1.OrderController.createOrder);
// get all Orders
router.get("/", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getAllOrders);
// get single Order by id
router.get("/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getSingleOrderById);
exports.OrderRouter = router;
