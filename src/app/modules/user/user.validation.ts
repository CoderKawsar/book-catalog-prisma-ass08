import { z } from "zod";

const UserRoles = z.enum(["customer", "admin"]);

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: UserRoles.optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
    password: z
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

export const UserValidation = {
  update,
};
