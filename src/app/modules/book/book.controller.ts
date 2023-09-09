import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { BookFilterableFields } from "./book.constants";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book created successfully!",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const options = pick(req.query, [
    "size",
    "page",
    "sortBy",
    "sortOrder",
    "minPrice",
    "maxPrice",
  ]);

  const result = await BookService.getAllBooks(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBookById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBookById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book fetched successfully!",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book updated successfully!",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book deleted successfully!",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBookById,
  updateBook,
  deleteBook,
};
