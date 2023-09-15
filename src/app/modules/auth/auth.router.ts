import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.signup),
  AuthController.signUp
);

router.post(
  "/signin",
  validateRequest(AuthValidation.login),
  AuthController.login
);

export const AuthRouter = router;
