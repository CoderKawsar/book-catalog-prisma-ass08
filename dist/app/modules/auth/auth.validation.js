"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const UserRoles = zod_1.z.enum(["customer", "admin"]);
const signup = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .email({
            message: "Provide a valid email.",
        }),
        password: zod_1.z.string({
            required_error: "Password is required!",
        }),
        role: UserRoles.default("customer"),
        contactNo: zod_1.z.string({
            required_error: "Contact number is required!",
        }),
        address: zod_1.z.string({
            required_error: "Address is required!",
        }),
        profileImg: zod_1.z.string().optional(),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .email({
            message: "Provide a valid email.",
        }),
        password: zod_1.z.string({
            required_error: "Password is required!",
        }),
    }),
});
exports.AuthValidation = {
    signup,
    login,
};
