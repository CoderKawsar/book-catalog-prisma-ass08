import { z } from "zod";

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required!",
    }),
    author: z.string({
      required_error: "Author is required!",
    }),
    price: z.number({
      required_error: "Price is required!",
    }),
    genre: z.string({
      required_error: "Genre is required!",
    }),
    publicationDate: z.date({
      required_error: "Publicaton date is required!",
    }),
    categoryId: z.date({
      required_error: "Category ID is required!",
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.date().optional(),
    categoryId: z.date().optional(),
  }),
});

export const BookValidation = {
  create,
  update,
};
