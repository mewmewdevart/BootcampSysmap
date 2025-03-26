import { z } from "zod";

const authValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default authValidation;