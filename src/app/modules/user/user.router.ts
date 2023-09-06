import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/users";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

// get all users
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

// get single user by id
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);

// update single user by id
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.update),
  UserController.updateUser
);

// delete single user by id
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRouter = router;
