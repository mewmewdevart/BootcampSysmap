import { create, getAll, getById, remove, update } from "../../src/repository/user-repository";

class UserService {
    // Method to get all users
    static async getAllUsers() {
        return await getAll();
    }

    // Method to get a user by ID
    static async getUserById(userId: string) {
        return await getById(userId);
    }

    // Method to create a new user
    static async createUser(userData: any) {
        return await create(userData);
    }

    // Method to update a user by ID
    static async updateUser(userData: any, userId: string) {
        return await update(userData, userId);
    }

    // Method to delete a user by ID
    static async deleteUser(userId: string) {
        return await remove(userId);
    }
}

export default UserService;
