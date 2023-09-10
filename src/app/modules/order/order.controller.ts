import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { OrderService } from "./order.service";
import { IUserIdAndRole } from "./order.interface";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order created successfully!",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { userId, role: userRole } = req.user as IUserIdAndRole;

  const result = await OrderService.getAllOrders(userId, userRole);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully!",
    data: result,
  });
});

const getSingleOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const { userId, role: userRole } = req.user as IUserIdAndRole;

  const result = await OrderService.getSingleOrderById(
    orderId,
    userId,
    userRole
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order fetched successfully!",
    data: result,
  });
});

/*
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.updateOrder(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order updated successfully!",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.deleteOrder(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order deleted successfully!",
    data: result,
  });
});
*/

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrderById,
};
