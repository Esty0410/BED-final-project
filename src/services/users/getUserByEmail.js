import { PrismaClient } from "@prisma/client";

const getUserByEmail = async (email) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findMany({
        where: { email },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phoneNumber: true,
            pictureUrl: true
        }
    });

    return user;
};

export default getUserByEmail;