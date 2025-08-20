import propertyData from '../../data/properties.json' with { type: 'json'};

const getPropertyByLocation = (locations) => {
    if (!Array.isArray(locations)) {
        locations = [locations];
    }

    return propertyData.properties.filter((property) => locations.includes(property.location));
};

export default getPropertyByLocation;