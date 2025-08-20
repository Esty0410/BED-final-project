import { Router } from 'express';
import getUsers from '../services/users/getUsers.js';
import createUser from '../services/users/createUser.js';
import getUserById from '../services/users/getUserById.js';
import getUserByUserName from '../services/users/getUserByUserName.js';
import getUserByEmail from '../services/users/getUserByEmail.js';
import deleteUserById from '../services/users/deleteUserById.js';
import updateUserById from '../services/users/updateUserById.js';
import authMiddleware from '../middleware/advancedAuth.js';

const router = Router();

router.get("/", (req, res) => {
    const { username, email } = req.query;

    let user;

    if (username) {
        user = getUserByUserName(username);
        if(!user) {
            return res.status(404).json({ message: `User with username ${username} was not found...`})
        }
    } else if (email) {
        user = getUserByEmail(email);
        if(!user) {
            return res.status(404).json({ message: `User with email ${email} was not found...`})
        }
    } else {
        user = getUsers();
        if (!user || user.length === 0) {
            return res.status(404).json({ message: `No users found...`})
        }
    } 

    res.status(200).json(user);
});

router.post("/", authMiddleware, (req, res) => {
    const { username, password, name, email, phoneNumber, pictureUrl } = req.body;
    const newUser = createUser(username, password, name, email, phoneNumber, pictureUrl);
    res.status(201).json(newUser);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);

    if(!user) {
        res.status(404).json({ message: `User with id ${id} was not found...` });
    } else {
        res.status(200).json(user);
    }
});

router.delete("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const user = deleteUserById(id);

    if (user) {
        res.status(200).send({
            message: `User with id ${id} deleted succesfully`,
            user,
        });
    } else {
        res.status(404).json({
            message: `User with id ${id} was not found...`
        });
    }
});

router.put("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, pictureUrl } = req.body;
    const user = updateUserById(id, { username, password, name, email, phoneNumber, pictureUrl });

    if (user) {
        res.status(200).send({
            message: `User with id ${id} updated successfully`,
            user,
        });
    } else {
        res.status(404).json({
            message: `User with id ${id} was not found...`
        });
    }
});

export default router;