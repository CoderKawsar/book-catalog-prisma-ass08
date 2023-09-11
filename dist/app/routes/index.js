"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = require("../modules/auth/auth.router");
const user_router_1 = require("../modules/user/user.router");
const category_router_1 = require("../modules/category/category.router");
const book_router_1 = require("../modules/book/book.router");
const order_router_1 = require("../modules/order/order.router");
const profile_1 = require("../modules/profile/profile");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_router_1.AuthRouter,
    },
    {
        path: "/users",
        route: user_router_1.UserRouter,
    },
    {
        path: "/categories",
        route: category_router_1.CategoryRouter,
    },
    {
        path: "/books",
        route: book_router_1.BookRouter,
    },
    {
        path: "/orders",
        route: order_router_1.OrderRouter,
    },
    {
        path: "/profile",
        route: profile_1.ProfileRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
