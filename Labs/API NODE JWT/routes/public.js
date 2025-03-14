/*
* Criação de 3 rotas:
* - Publicas: Cadastro e Login
*
* - Privadas: Listar usuarios
*/

import express from 'express'
import bcrypt from 'bcrypt'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

// Cadastro
router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            }
        });
        res.status(201).json(userDB);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, please try again", error: err.message }); 
    }
});

export default router
