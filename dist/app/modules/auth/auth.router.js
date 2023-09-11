"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signup), auth_controller_1.AuthController.signUp);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.login), auth_controller_1.AuthController.login);
exports.AuthRouter = router;
