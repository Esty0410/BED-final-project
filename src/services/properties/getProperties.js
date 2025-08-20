import propertyData from '../../data/properties.json' with { type: 'json' };

const getProperties = () => {
    return propertyData.properties;
};

export default getProperties;