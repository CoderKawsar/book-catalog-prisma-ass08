import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.router";
import { UserRouter } from "../modules/user/user.router";
import { CategoryRouter } from "../modules/category/category.router";
import { BookRouter } from "../modules/book/book.router";
import { OrderRouter } from "../modules/order/order.router";

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
  {
    path: "/books",
    route: BookRouter,
  },
  {
    path: "/orders",
    route: OrderRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
