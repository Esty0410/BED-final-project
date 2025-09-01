import { Router } from 'express';
import getHosts from '../services/hosts/getHosts.js';
import createHost from '../services/hosts/createHost.js';
import getHostById from '../services/hosts/getHostById.js';
import getHostByName from '../services/hosts/getHostByName.js';
import deleteHostById from '../services/hosts/deleteHostById.js';
import updateHostById from '../services/hosts/updateHostById.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        let host;

        if (name) {
            host = await getHostByName(name);
            if (!host) {
                return res.status(404).json({ message: `Host with name ${name} was not found...`})
            }
        } else {
            host = await getHosts();
            if (!host || host.length === 0) {
                return res.status(404).json({ message: `No hosts found...`})
            }
        }

        res.status(200).json(host);
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;
        const newHost = await createHost(username, password, name, email, phoneNumber, pictureUrl, aboutMe);
        res.status(201).json(newHost);
    } catch (err) {
        if (err.code === "HOST_EXISTS") {
            return res.status(409).json({ message: 'User already exists..'});
        }
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const host = await getHostById(id);

        if (!host) {
            res.status(404).json({
                message: `Host with id ${id} not found...`
            });
        } else {
            res.status(200).json(host);
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("router id:", id)
        const host = await deleteHostById(id);
        console.log("router host:", id)

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
    } catch (err) {
        console.log("foutmelding:", err)
        console.error(err);
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = req.body;
        const host = await updateHostById(id, { username, password, name, email, phoneNumber, pictureUrl, aboutMe });

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
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

export default router;