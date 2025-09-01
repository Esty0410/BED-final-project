import { PrismaClient } from "@prisma/client";

const getPropertyByLocationAndPrice = async (location, pricePerNight) => {
    const prisma = new PrismaClient();
    const property = await prisma.property.findMany({
        where: {
            location,
            pricePerNight: Number(pricePerNight),
        },
    });

    return property;
};

export default getPropertyByLocationAndPrice;