import propertyData from '../../data/properties.json' with { type: 'json'};

const getPropertyByLocationAndPrice = (locations, pricePerNight) => {
    if (!Array.isArray(locations)) {
        locations = [locations];
    }
    return propertyData.properties.filter((property) => 
        locations.includes(property.location) && property.pricePerNight <= pricePerNight
    )
};

export default getPropertyByLocationAndPrice;