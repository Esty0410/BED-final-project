import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
    try {
    console.log("deletepPropertyById id:", id)
    const prisma = new PrismaClient();
    const property = await prisma.property.delete({
        where: { id },
        include: { propertyHost: true },
    });
    console.log("deletePropertyById property:", property)

    return property;
} catch (err) {
    if (err.code === "P2025") {
        return null;
    }
    throw err;
}
};

export default deletePropertyById;