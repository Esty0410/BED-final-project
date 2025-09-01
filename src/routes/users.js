import { Router } from 'express';
import getUsers from '../services/users/getUsers.js';
import createUser from '../services/users/createUser.js';
import getUserById from '../services/users/getUserById.js';
import getUserByUserName from '../services/users/getUserByUserName.js';
import getUserByEmail from '../services/users/getUserByEmail.js';
import deleteUserById from '../services/users/deleteUserById.js';
import updateUserById from '../services/users/updateUserById.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { username, email } = req.query;
        let user;

        if (username) {
        user = await getUserByUserName(username);
            if(!user) {
                return res.status(404).json({ message: `User with username ${username} was not found...`})
            }
        } else if (email) {
            user = await getUserByEmail(email);
            if(!user) {
                return res.status(404).json({ message: `User with email ${email} was not found...`})
            }
        } else {
            user = await getUsers();
            if (!user || user.length === 0) {
                return res.status(404).json({ message: `No users found...`})
            }
        } 

    res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { username, password, name, email, phoneNumber, pictureUrl } = req.body;
        const newUser = await createUser(username, password, name, email, phoneNumber, pictureUrl);
        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === "USER_EXISTS") {
            return res.status(409).json({ message: 'User already exists..'});
        }
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} was not found...` });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteUserById(id);

        if (user) {
            res.status(200).send({
                message: `User with id ${id} deleted successfully`,
                user,
            });
        } else {
            res.status(404).json({ message: `User with id ${id} was not found...` });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, pictureUrl } = req.body;
        const user = await updateUserById(id, { username, password, name, email, phoneNumber, pictureUrl });

        if (user) {
            res.status(200).send({
                message: `User with id ${id} updated succesfully`,
                user,
            });
        } else {
            res.status(404).json({
                message: `User with id ${id} was not found...`
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal server error", error: err,message 
        });
    }
});

export default router;