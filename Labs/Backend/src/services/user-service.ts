import { create } from "../repository/user-repository";
import bcrypt from "bcryptjs";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const encryptedPassword = await bcrypt.hash(data.password, 10);
  data.password = encryptedPassword;

  return await create(data);
}