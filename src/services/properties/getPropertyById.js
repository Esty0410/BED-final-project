import propertyData from '../../data/properties.json' with { type: 'json' };

const getPropertyById = (id) => {
    return propertyData.properties.find((property) => property.id === id);
};

export default getPropertyById;