import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
    console.log("deletepPropertyById id:", id)
    const prisma = new PrismaClient();
    const property = await prisma.property.delete({
        where: { id },
        include: { propertyHost: true },
    });
    console.log("deletePropertyById property:", property)

    return property;
};

export default deletePropertyById;