import z from "zod";

export const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters"),
    name: z.string(),
    role: z.enum(["creator", "user"])
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters")
});

export type Signup = z.infer<typeof SignupSchema>;
export type Login = z.infer<typeof LoginSchema>;

