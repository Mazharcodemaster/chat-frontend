import { z } from "zod";

// User creation schema
export const createUserSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(50, "Name must be less than or equal to 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be less than or equal to 15 characters"),
  proFileImage: z.string().min(1, "Profile image is required"),
  bio: z.string().max(160, "Bio must be less than or equal to 160 characters"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

// Login schema
export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


// Optional: derive TypeScript types
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
