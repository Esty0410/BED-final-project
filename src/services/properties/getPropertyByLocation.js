import { PrismaClient } from "@prisma/client";

const getPropertyByLocation = async (location) => {
    const prisma = new PrismaClient();
    const property = await prisma.property.findMany({
        where: { location },
    });

    return property;
};

export default getPropertyByLocation;