// export function createUser (data: string, email: string, password: string) {
//     const user = await 
// }

import bcrypt from "bcryptjs";
import { create } from "../repository/user-repository";

export async function createUser(data: { name: string, email: string, password: string }) {
    const encryptedPassword = await bcrypt.hash(data.password, 10);

    data.password = encryptedPassword;

    return await create(data);
}