import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/list-users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ message: "users listed with success", users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error, please try again", error: err.message });
    }
});

export default router;