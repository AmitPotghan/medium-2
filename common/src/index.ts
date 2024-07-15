import z from "zod"

export const userSignUpBody = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8),
    name: z.string()
})
export const userSignInBody = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8),
})
export const createBlogPost = z.object({
    title: z.string(),
    content: z.string(),
})
export const updateBlogPost = z.object({
    title: z.string(),
    content: z.string(),
    id:z.string()
})

export type userSignUpBody = z.infer<typeof userSignUpBody>
export type userSignInBody = z.infer<typeof userSignInBody>
export type createBlogPost = z.infer<typeof createBlogPost>
export type updateBlogPost = z.infer<typeof updateBlogPost>
