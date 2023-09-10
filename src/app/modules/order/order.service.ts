import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ICreateOrderPayload } from "./order.interface";
import { JwtPayload } from "jsonwebtoken";

const createOrder = async (payload: ICreateOrderPayload): Promise<Order> => {
  let createdOrder: Order | undefined;

  await prisma.$transaction(async (transactionClient) => {
    createdOrder = await transactionClient.order.create({
      data: {
        userId: payload.userId,
      },
    });

    if (!createdOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, "Order could not be created!");
    }

    await transactionClient.orderedBook.createMany({
      data: payload.orderedBooks.map((orderedBookSingle) => ({
        orderId: createdOrder?.id ?? "",
        bookId: orderedBookSingle.bookId,
        quantity: orderedBookSingle.quantity,
      })),
    });
  });

  const newOrder = await prisma.order.findFirst({
    where: {
      id: createdOrder?.id ?? "",
    },
    include: { orderedBooks: true },
  });

  if (!newOrder) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found!");
  }

  return newOrder;
};

const getAllOrders = async (
  userId: string,
  userRole: string
): Promise<Order[]> => {
  let result: Order[] | undefined;

  if (userRole === "admin") {
    result = await prisma.order.findMany({
      include: { orderedBooks: true },
    });
  }

  if (userRole === "customer") {
    result = await prisma.order.findMany({
      where: { userId },
      include: { orderedBooks: true },
    });
  }

  if (!result?.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No order found!");
  }

  return result;
};

const getSingleOrderById = async (
  orderId: string,
  userId: string,
  userRole: string
): Promise<Order | null> => {
  const result = await prisma.order.findFirst({
    where: { id: orderId },
    include: { orderedBooks: true },
  });

  if (result?.userId === userId || userRole === "admin") {
    return result;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }
};

/*
const updateOrder = async (
  id: string,
  payload: Partial<Order>
): Promise<Order> => {
  const result = await prisma.Order.update({
    where: { id },
    data: payload,
    include: { category: true },
  });

  return result;
};

const deleteOrder = async (id: string): Promise<Order> => {
  const result = await prisma.Order.delete({
    where: { id },
    include: { category: true },
  });

  return result;
};
*/

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrderById,
};
