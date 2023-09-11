"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const users_1 = require("../../../enums/users");
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = (0, express_1.Router)();
// create Book
router.post("/create-book", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.createBook);
// get all Books
router.get("/", book_controller_1.BookController.getAllBooks);
// get books of a category
router.get("/:categoryId/category", book_controller_1.BookController.getBooksOfACategory);
// get single Book by id
router.get("/:id", book_controller_1.BookController.getSingleBookById);
// update single Book by id
router.patch("/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(book_validation_1.BookValidation.update), book_controller_1.BookController.updateBook);
// delete single Book by id
router.delete("/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.deleteBook);
exports.BookRouter = router;
