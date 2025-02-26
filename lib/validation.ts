import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    fullName: z.string().min(3),
    password: z.string().min(8),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("University Card is required"),
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const bookSchema = z.object({
    videoUrl: z.string().nonempty(),
    coverUrl: z.string().nonempty(),
    summary: z.string().trim().min(10),
    genre: z.string().trim().min(2).max(50),
    rating: z.coerce.number().min(1).max(5),
    title: z.string().trim().min(2).max(100),
    author: z.string().trim().min(2).max(100),
    description: z.string().trim().min(10).max(1000),
    coverColor: z.string().trim().regex(/^#[0-9A-F]{6}$/i),
    totalCopies: z.coerce.number().int().positive().lte(10000),
});