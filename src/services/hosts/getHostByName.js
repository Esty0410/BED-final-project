import { PrismaClient } from "@prisma/client";

const getHostByName = async (name) => {
    const prisma = new PrismaClient();
    const host = await prisma.host.findMany({
        where: { name },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phoneNumber: true,
            pictureUrl: true,
            aboutMe: true,
        },
    });

    return host;};

export default getHostByName;