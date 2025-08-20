import { v4 as uuidv4 } from 'uuid';
import propertyData from '../../data/properties.json' with { type: 'json' };

const createProperty = (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
    const newProperty = {
        id: uuidv4(),
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating,
    };

    propertyData.properties.push(newProperty);
    return newProperty;
};

export default createProperty;