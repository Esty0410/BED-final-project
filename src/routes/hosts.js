import { Router } from 'express';
import getHosts from '../services/hosts/getHosts.js';
import createHost from '../services/hosts/createHost.js';
import getHostById from '../services/hosts/getHostById.js';
import getHostByName from '../services/hosts/getHostByName.js';
import deleteHostById from '../services/hosts/deleteHostById.js';
import updateHostById from '../services/hosts/updateHostById.js';
import authMiddleware from '../middleware/advancedAuth.js';

const router = Router();

router.get("/", (req, res) => {
    const { name } = req.query;

    let host;

    if (name) {
        host = getHostByName(name);
        if (!host) {
            return res.status(404).json({ message: `Host with name ${name} was not found...`})
        }
    } else {
        host = getHosts();
        if (!host || host.length === 0) {
            return res.status(404).json({ message: `No hosts found...`})
        }
    }

    res.status(200).json(host);
});

router.post("/", authMiddleware, (req, res) => {
    const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;
    const newHost = createHost(username, password, name, email, phoneNumber, pictureUrl, aboutMe);
    res.status(201).json(newHost);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const host = getHostById(id);

    if (!host) {
        res.status(404).json({
            message: `Host with id ${id} not found...`
        });
    } else {
        res.status(200).json(host);
    }
});

router.delete("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const host = deleteHostById(id);

    if (host) {
        res.status(200).send({
            message: `Host with id ${id} deleted successfully`,
            host,
        });
    } else {
        res.status(404).json({
            message: `Host with id ${id} was not found...`
        });
    }
});

router.put("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;
    const host = updateHostById(id, { username, password, name, email, phoneNumber, pictureUrl, aboutMe });

    if (host) {
        res.status(200).send({
            message: `Host with id ${id} updated successfully`,
            host,
        });
    } else {
        res.status(404).json({
            message: `Host with id ${id} not found...`
        });
    }
});

export default router;