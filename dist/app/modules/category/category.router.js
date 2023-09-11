"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const users_1 = require("../../../enums/users");
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = (0, express_1.Router)();
// create category
router.post("/create-category", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.create), category_controller_1.CategoryController.createCategory);
// get all Categorys
router.get("/", category_controller_1.CategoryController.getAllCategories);
// get single Category by id
router.get("/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.getSingleCategory);
// update single Category by id
router.patch("/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(category_validation_1.CategoryValidation.update), category_controller_1.CategoryController.updateCategory);
// delete single Category by id
router.delete("/:id", (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRouter = router;
