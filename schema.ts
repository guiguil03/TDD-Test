import {z} from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number()
});

if (!productSchema.safeParse({ id: "1", name: "Product 1", price: 10, quantity: 1 }).success) {
  throw new Error("Invalid product");
}
