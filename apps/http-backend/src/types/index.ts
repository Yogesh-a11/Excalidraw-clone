import z from "zod";

export const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters"),
    name: z.string(),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters")
});

export type Signup = z.infer<typeof SignupSchema>;
export type Login = z.infer<typeof LoginSchema>;

export const CreateSpaceSchema = z.object({
    name: z.string().min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
})


declare global {
    namespace Express {
        export interface Request {
        userId?: string;
        }
    }
}