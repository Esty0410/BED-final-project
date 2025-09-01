import { PrismaClient } from "@prisma/client";

const getUserByUserName = async (username) => {
    const prisma = new PrismaClient();
    const user = prisma.user.findUnique({
        where: { username },
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

export default getUserByUserName;