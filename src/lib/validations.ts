import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .min(5)
    .max(50)
    .trim(),
  password: z.string().min(3).max(50).trim(),
});
