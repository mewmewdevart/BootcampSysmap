/*
 * Creation of 3 routes:
 * - Public: Register and Login
 *
 * - Private: List users
 */

import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
	const user = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(user.password, salt);

	const userDB = await prisma.user.create({
	  data: {
		email: user.email,
		name: user.name,
		password: hashPassword,
	  },
	});
	res.status(201).json(userDB);
  } catch (err) {
	console.error(err);
	res
	  .status(500)
	  .json({ message: "Server error, please try again", error: err.message });
  }
});

router.post("/login", async (req, res) => {
	try {
	  const userInformation = req.body;
	  const user = await prisma.user.findUnique({
		where: { email: userInformation.email },
	  });
  
	  // Check if the user exist in the db
	  if (!user) {
		return res.status(404).json({ message: "User not found!" });
	  }
  
	  // Compare the password with the db and user
	  const isMatch = await bcrypt.compare(userInformation.password, user.password)
	  if (!isMatch){
		  return res.status(400).json({ message: "The password is wrong!" });
	  }

	  // Generate jwt
	  const token = jwt.sign({
		id: user.id
	  }, JWT_SECRET, { expiresIn: '1d'})

	  res.status(200).json(token);
	} catch (err) {
	  console.error(err);
	  res
		.status(500)
		.json({ message: "Server error, please try again", error: err.message });
	}
  });

export default router;
