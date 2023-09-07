import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.router";
import { UserRouter } from "../modules/user/user.router";
import { CategoryRouter } from "../modules/category/category.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/categories",
    route: CategoryRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
