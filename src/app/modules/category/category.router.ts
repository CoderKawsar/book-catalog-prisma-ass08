import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../../enums/users";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = Router();

// create category
router.post("/", auth(ENUM_USER_ROLE.ADMIN), CategoryController.createCategory);

// get all Categorys
router.get("/", CategoryController.getAllCategories);

// get single Category by id
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.getSingleCategory
);

// update single Category by id
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.update),
  CategoryController.updateCategory
);

// delete single Category by id
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRouter = router;
