import { PrismaClient } from "@prisma/client";

const createUser = async (username, password, name, email, phoneNumber, pictureUrl) => {
    const prisma = new PrismaClient();
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    });

    if (existingUser) {
        const error = new Error('User already exists');
        error.code = 'USER_EXISTS';
        throw error;
    }

    return await prisma.user.create({
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            pictureUrl
        }
    });
};

export default createUser;