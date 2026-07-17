import { z } from "zod";

export const loginSchema = z.object({
  adminId: z.string().min(1, "Admin ID is required"),
  password: z.string().min(1, "Password is required"),
});

export const consultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  budget: z.string().optional(),
  metalPreference: z.string().optional(),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be 0 or greater"),
  category: z.string().min(1, "Category is required"),
  metal: z.string().optional(),
  gender: z.string().optional(),
  imageUrl: z.string().optional(),
  stock: z.number().int().min(0).default(1),
  isFeatured: z.boolean().default(false),
  imagePositionX: z.number().min(0).max(100).optional(),
  imagePositionY: z.number().min(0).max(100).optional(),
  imageScale: z.number().min(10).max(300).optional(),
  images: z.array(z.object({
    imageUrl: z.string().optional(),
    colorName: z.string().optional(),
    isPrimary: z.boolean().default(false),
  })).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ProductInput = z.infer<typeof productSchema>;
