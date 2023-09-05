import { Router } from "express";

const router = Router();

const moduleRoutes = [];

moduleRoutes.forEach((route) => route.use(route.path, route.route));

export default router;
