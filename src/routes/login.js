import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/", async (req, res) => {
    const prisma = new PrismaClient();
    const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
    const { username, password } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username},
            secretKey,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Succesfully logged in ;)",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong....." });
    }
    
 });

 export default router;