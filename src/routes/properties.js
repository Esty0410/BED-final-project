import { Router } from 'express';
import getProperties from '../services/properties/getProperties.js';
import createProperty from '../services/properties/createProperty.js';
import getPropertyById from '../services/properties/getPropertyById.js';
import getPropertyByLocation from '../services/properties/getPropertyByLocation.js';
import getPropertyByPricePerNight from '../services/properties/getPropertyByPricePerNight.js';
import getPropertyByLocationAndPrice from '../services/properties/getPropertyByLocationAndPrice.js';
import deletePropertyById from '../services/properties/deletePropertyById.js';
import updatePropertyById from '../services/properties/updatePropertyById.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { location, pricePerNight } = req.query;

        let property;
        if (location && pricePerNight) {
            property = await getPropertyByLocationAndPrice(location, pricePerNight);
            if (!property || property.length === 0) {
                return res.status(404).json({ message: `Property with location ${location} and price ${pricePerNight} was not found...`});
            }
        } else if (location) {
            property = await getPropertyByLocation(location);
            if (!property || property.length === 0) {
                return res.status(404).json({ message: `Property with location ${location} was not found...`});
            }
        } else if (pricePerNight) {
            property = await getPropertyByPricePerNight(pricePerNight);
            if(!property || property.length === 0) {
                return res.status(404).json({ message: `Property with price ${pricePerNight} was not found...`})
            }
        } else {
            property = await getProperties();
            if(!property || property.length === 0) {
                return res.status(404).json({ message: `No properties found...`})
            }
        }

        res.status(200).json(property);
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating} = req.body;
        if (!title || !description || !location || !pricePerNight || !bedroomCount || !bathRoomCount || !maxGuestCount || !hostId || !rating) {
            return res.status(400).json({ message: "Missing required fields"});
        }
        const newProperty = await createProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
        console.log("New property created:", newProperty);
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const property = await getPropertyById(id);

        if (!property) {
            res.status(404).json({
                message: `Property with id ${id} not found...`
            });
        } else {
            res.status(200).json(property);
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("router id:", id)
        const property = await deletePropertyById(id);
        console.log("router id:", id)

        if (property) {
            res.status(200).send({
                message: `Property with id ${id} deleted successfully`,
                property,
            });
        } else {
            res.status(404).json({
                message: `Property with id ${id} was not found...`
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
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
        const property = await updatePropertyById(id, { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating });

        if (property) {
            res.status(200).send({
                message: `Property with id ${id} updated successfully`,
                property,
            });
        } else {
            res.status(404).json({
                message: `Property with id ${id} not found...`
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

export default router;