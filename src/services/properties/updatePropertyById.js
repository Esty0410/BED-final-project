import propertyData from '../../data/properties.json' with { type: 'json' };

const updatePropertyById = (id, updatedProperty) => {
    const propertyIndex = propertyData.properties.findIndex((property) => property.id === id);

    if (propertyIndex === -1) {
        return null;
    }

    const { title, description, price, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = updatedProperty;

    propertyData.properties[propertyIndex] = {
        ...propertyData.properties[propertyIndex],
        title: title || propertyData.properties[propertyIndex].title,
        description: description || propertyData.properties[propertyIndex].description,
        price: price || propertyData.properties[propertyIndex].price,
        location: location || propertyData.properties[propertyIndex].location,
        pricePerNight: pricePerNight || propertyData.properties[propertyIndex].pricePerNight,
        bedroomCount: bedroomCount || propertyData.properties[propertyIndex].bedroomCount,
        bathRoomCount: bathRoomCount || propertyData.properties[propertyIndex].bathRoomCount,
        maxGuestCount: maxGuestCount || propertyData.properties[propertyIndex].maxGuestCount,
        hostId: hostId || propertyData.properties[propertyIndex].hostId,
        rating: rating || propertyData.properties[propertyIndex].rating,
    };

    return propertyData.properties[propertyIndex];
};

export default updatePropertyById;