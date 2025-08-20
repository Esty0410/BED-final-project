import propertyData from '../../data/properties.json' with { type: 'json' };

const deletePropertyById = (id) => {
    const propertyIndex = propertyData.properties.findIndex(property => property.id === id);

    if (propertyIndex === -1) {
        return null;
    }

    const deletedProperty = propertyData.properties.splice(propertyIndex, 1);
    return deletedProperty;
};

export default deletePropertyById;