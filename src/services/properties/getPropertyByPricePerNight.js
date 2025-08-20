import propertyData from '../../data/properties.json' with { type: 'json'};

const getPropertyByPricePerNight = (pricePerNight) => {
    const price = parseFloat(pricePerNight);
    return propertyData.properties.find((property) => property.pricePerNight === price);
};

export default getPropertyByPricePerNight;