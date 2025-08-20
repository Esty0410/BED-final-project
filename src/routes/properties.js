import { Router } from 'express';
import getProperties from '../services/properties/getProperties.js';
import createProperty from '../services/properties/createProperty.js';
import getPropertyById from '../services/properties/getPropertyById.js';
import getPropertyByLocation from '../services/properties/getPropertyByLocation.js';
import getPropertyByPricePerNight from '../services/properties/getPropertyByPricePerNight.js';
import getPropertyByLocationAndPrice from '../services/properties/getPropertyByLocationAndPrice.js';
import deletePropertyById from '../services/properties/deletePropertyById.js';
import updatePropertyById from '../services/properties/updatePropertyById.js';
import authMiddleware from '../middleware/advancedAuth.js';

const router = Router();

router.get("/", (req, res) => {
    const { location, pricePerNight } = req.query;

    let property;
    if (location && pricePerNight) {
        property = getPropertyByLocationAndPrice(location, pricePerNight);
        if (!property) {
            return res.status(404).json({ message: `Property with location ${location} and price ${pricePerNight} was not found...`});
        }
    } else if (location) {
        property = getPropertyByLocation(location);
        if (!property) {
            return res.status(404).json({ message: `Property with location ${location} was not found...`});
        }
    } else if (pricePerNight) {
        property = getPropertyByPricePerNight(pricePerNight);
        if(!property) {
            return res.status(404).json({ message: `Property with price ${pricePerNight} was not found...`})
        }
    } else {
        property = getProperties();
        if(!property || property.length === 0) {
            return res.status(404).json({ message: `No properties found...`})
        }
    }

    res.status(200).json(property);
});

router.post("/", authMiddleware, (req, res) => {
    const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating} = req.body;
    const newProperty = createProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
    res.status(201).json(newProperty);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const property = getPropertyById(id);

    if (!property) {
        res.status(404).json({
            message: `Property with id ${id} not found...`
        });
    } else {
        res.status(200).json(property);
    }
});

router.delete("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const property = deletePropertyById(id);

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
});

router.put("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
    const property = updatePropertyById(id, { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating });

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
});

export default router;