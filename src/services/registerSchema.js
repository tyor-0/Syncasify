import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z
            .string()
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name is too long"),

        lastName: z
            .string()
            .min(2, "Last name must be at least 2 characters")
            .max(50, "Last name is too long"),

        email: z
            .string()
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must include at least one uppercase letter")
            .regex(/[a-z]/, "Must include at least one lowercase letter")
            .regex(/[0-9]/, "Must include at least one number"),

        confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });