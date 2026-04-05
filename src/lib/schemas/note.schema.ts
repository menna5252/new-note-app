import * as z from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  content: z
    .string()
    .nonempty("Content is required")
    .min(3, "Content must be at least 3 characters")
    .max(1000, "Content must be less than 1000 characters"),
});


export type NoteFormData = z.infer<typeof noteSchema>;