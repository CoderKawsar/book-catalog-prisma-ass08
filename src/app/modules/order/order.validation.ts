import { z } from "zod";

const OrderedBookSchema = z.object({
  bookId: z.string({
    required_error: "Book ID is required!",
  }),
  quantity: z
    .number({
      required_error: "Qunatity is required!",
    })
    .int(),
});

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User ID is required!",
    }),
    orderedBooks: z.array(OrderedBookSchema),
  }),
});

export const OrderValidation = {
  create,
};
