import { z } from "zod";

const UserRoles = z.enum(["customer", "admin"]);

const signup = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email({
        message: "Provide a valid email.",
      }),
    password: z.string({
      required_error: "Password is required!",
    }),
    role: UserRoles.default("customer"),
    contactNo: z.string({
      required_error: "Contact number is required!",
    }),
    address: z.string({
      required_error: "Address is required!",
    }),
    profileImg: z.string().optional(),
  }),
});

const login = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email({
        message: "Provide a valid email.",
      }),
    password: z.string({
      required_error: "Password is required!",
    }),
  }),
});

export const AuthValidation = {
  signup,
  login,
};
