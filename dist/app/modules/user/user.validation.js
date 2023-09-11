"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const UserRoles = zod_1.z.enum(["customer", "admin"]);
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        role: UserRoles.optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
        password: zod_1.z
            .string()
            .transform((val) => {
            // If a password is provided in the payload, raise a validation error.
            if (val !== undefined) {
                throw new Error("Password field cannot be updated");
            }
            return undefined;
        })
            .optional(),
    }),
});
exports.UserValidation = {
    update,
};
