import { z } from "zod";

const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export default userValidation;