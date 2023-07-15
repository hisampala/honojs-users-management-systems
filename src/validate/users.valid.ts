import { z } from "zod";
import { hashSync } from "@node-rs/argon2";
export const ZCreateUsers = z.object({
  email: z.string().email().min(1),
  full_name: z.string().min(1),
  phone: z.string().min(1),
  password: z
    .string()
    .min(8, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number"),
});
export const ZUpdateUsers = z.object({
  full_name: z.string().min(1),
  phone: z.string().min(1),
});
