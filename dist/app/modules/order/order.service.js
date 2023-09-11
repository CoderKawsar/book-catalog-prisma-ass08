"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let createdOrder;
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        createdOrder = yield transactionClient.order.create({
            data: {
                userId: payload.userId,
            },
        });
        if (!createdOrder) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order could not be created!");
        }
        yield transactionClient.orderedBook.createMany({
            data: payload.orderedBooks.map((orderedBookSingle) => {
                var _a;
                return ({
                    orderId: (_a = createdOrder === null || createdOrder === void 0 ? void 0 : createdOrder.id) !== null && _a !== void 0 ? _a : "",
                    bookId: orderedBookSingle.bookId,
                    quantity: orderedBookSingle.quantity,
                });
            }),
        });
    }));
    const newOrder = yield prisma_1.default.order.findFirst({
        where: {
            id: (_a = createdOrder === null || createdOrder === void 0 ? void 0 : createdOrder.id) !== null && _a !== void 0 ? _a : "",
        },
        include: { orderedBooks: true },
    });
    if (!newOrder) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order not found!");
    }
    return newOrder;
});
const getAllOrders = (userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (userRole === "admin") {
        result = yield prisma_1.default.order.findMany({
            include: { orderedBooks: true },
        });
    }
    if (userRole === "customer") {
        result = yield prisma_1.default.order.findMany({
            where: { userId },
            include: { orderedBooks: true },
        });
    }
    if (!(result === null || result === void 0 ? void 0 : result.length)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No order found!");
    }
    return result;
});
const getSingleOrderById = (orderId, userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findFirst({
        where: { id: orderId },
        include: { orderedBooks: true },
    });
    if ((result === null || result === void 0 ? void 0 : result.userId) === userId || userRole === "admin") {
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized!");
    }
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrderById,
};
