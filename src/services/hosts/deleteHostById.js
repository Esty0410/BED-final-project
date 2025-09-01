import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
    console.log("deleteHostById id:", id)
    const prisma = new PrismaClient();
    const host = await prisma.host.deleteMany({
        where: { id },
    });
    console.log("deleteHostById host:", host)

    return host;
};

export default deleteHostById;