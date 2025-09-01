import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, updatedUser) => {
    const primsa = new PrismaClient();
    const user = await primsa.user.updateMany({
        where: { id },
        data: updatedUser,
    });

    return user.count > 0 ? id : null;
};

export default updateUserById;