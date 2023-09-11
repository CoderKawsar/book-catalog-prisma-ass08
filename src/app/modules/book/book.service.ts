import { Book, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBookFilters, IBookOptions } from "./book.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { BookSearchableFields } from "./book.constants";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: { category: true },
  });
  return result;
};

const getAllBooks = async (filters: IBookFilters, options: IBookOptions) => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, category, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (category) {
    filterData.categoryId = category;
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  if (options.maxPrice && options.minPrice) {
    andConditions.push({
      price: {
        lte: parseFloat(options.maxPrice),
        gte: parseFloat(options.minPrice),
      },
    });
  } else if (options.maxPrice) {
    andConditions.push({
      price: {
        lte: parseFloat(options.maxPrice),
      },
    });
  } else if (options.minPrice) {
    andConditions.push({
      price: {
        gte: parseFloat(options.minPrice),
      },
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    skip,
    take: size,
    orderBy: options.sortBy
      ? {
          [options.sortBy]: options.sortOrder || "asc",
        }
      : {
          title: "asc",
        },
  });
  const total = await prisma.book.count();
  return {
    meta: {
      page,
      size,
      total,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const getSingleBookOrCategoryBooksById = async (
  id: string,
  options: IBookOptions
) => {
  let result: Book | Book[] | null;

  result = await prisma.book.findFirst({
    where: { id },
    include: { category: true },
  });
  if (result) {
    return result;
  }

  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: { category: true },
    skip,
    take: size,
    orderBy: options.sortBy
      ? {
          [options.sortBy]: options.sortOrder || "asc",
        }
      : {
          title: "asc",
        },
  });
  const total = await prisma.book.count({
    where: { categoryId: id },
  });

  if (result.length) {
    return {
      meta: {
        page,
        size,
        total,
        totalPage: Math.ceil(total / size),
      },
      data: result,
    };
  }

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No book found!");
  }
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
    include: { category: true },
  });

  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: { id },
    include: { category: true },
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBookOrCategoryBooksById,
  updateBook,
  deleteBook,
};
