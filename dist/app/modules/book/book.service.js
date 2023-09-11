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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_constants_1 = require("./book.constants");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: { category: true },
    });
    return result;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, category } = filters, filterData = __rest(filters, ["searchTerm", "category"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: book_constants_1.BookSearchableFields.map((field) => ({
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
                    equals: filterData[key],
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
    }
    else if (options.maxPrice) {
        andConditions.push({
            price: {
                lte: parseFloat(options.maxPrice),
            },
        });
    }
    else if (options.minPrice) {
        andConditions.push({
            price: {
                gte: parseFloat(options.minPrice),
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
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
    const total = yield prisma_1.default.book.count();
    return {
        meta: {
            page,
            size,
            total,
            totalPage: Math.ceil(total / size),
        },
        data: result,
    };
});
const getSingleBookOrCategoryBooksById = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    result = yield prisma_1.default.book.findFirst({
        where: { id },
        include: { category: true },
    });
    if (result) {
        return result;
    }
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    result = yield prisma_1.default.book.findMany({
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
    const total = yield prisma_1.default.book.count({
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No book found!");
    }
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: { id },
        data: payload,
        include: { category: true },
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: { id },
        include: { category: true },
    });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBookOrCategoryBooksById,
    updateBook,
    deleteBook,
};
