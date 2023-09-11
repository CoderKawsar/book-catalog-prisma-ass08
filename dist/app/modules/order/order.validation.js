"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const OrderedBookSchema = zod_1.z.object({
    bookId: zod_1.z.string({
        required_error: "Book ID is required!",
    }),
    quantity: zod_1.z
        .number({
        required_error: "Qunatity is required!",
    })
        .int(),
});
const create = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "User ID is required!",
        }),
        orderedBooks: zod_1.z.array(OrderedBookSchema),
    }),
});
exports.OrderValidation = {
    create,
};
