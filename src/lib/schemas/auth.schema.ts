import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      `Minimum eight characters, at least one upper case English letter, 
      one lower case English letter, one number and one special character`,
    ),
    age:z.string().nonempty('age is required'),
    phone:z.string().nonempty('phone is required').regex(/^01[0125][0-9]{8}$/,'Enter a valid Egyptian phone number'),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>

export const loginSchema = z.object({

  email: z.email("Enter a valid email"),
  password: z
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      `Minimum eight characters, at least one upper case English letter, 
      one lower case English letter, one number and one special character`,
    ),
    
});

export type LoginSchemaType = z.infer<typeof loginSchema>
