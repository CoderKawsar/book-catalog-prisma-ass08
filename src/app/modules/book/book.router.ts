import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../../enums/users";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";

const router = Router();

// create Book
router.post("/", auth(ENUM_USER_ROLE.ADMIN), BookController.createBook);

// get all Books
router.get("/", BookController.getAllBooks);

// get single Book by id
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.getSingleBookById
);

// update single Book by id
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateBook
);

// delete single Book by id
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRouter = router;
