import { PrismaClient } from "@prisma/client";

const getPropertyByPricePerNight = async (pricePerNight) => {
    const prisma = new PrismaClient();
    const property = await prisma.property.findMany({
        where: { pricePerNight: Number(pricePerNight) },
    });

    return property;
};

export default getPropertyByPricePerNight;