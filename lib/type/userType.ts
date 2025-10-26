import z from "zod";

export const createUserType = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than or equal to 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be less than or equal to 15 characters"),
  proFileImage: z.string().min(1, "Profile image is required"),
  bio: z.string().max(160, "Bio must be less than or equal to 160 characters").optional(),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
})


export type CreateUserInput = z.infer<typeof createUserType>

// ✅ Define Zod schema for login
export const loginUserType = z.object({
  email: z.string().min(1, { message: "Required" }).email({ message: "Invalid email address" }),
  password: z.string()  .min(1, { message: "Required" }),
})

// ✅ Infer TypeScript type from schema
export type LoginUserInput = z.infer<typeof loginUserType>



