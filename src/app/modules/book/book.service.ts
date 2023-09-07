import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({ data });
  return result;
};

const getAllBooks = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({});
  return result;
};

const getSingleBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findFirst({
    where: { id },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: { id },
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBookById,
  updateBook,
  deleteBook,
};
