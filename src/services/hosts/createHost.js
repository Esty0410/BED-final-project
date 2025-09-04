import { PrismaClient } from "@prisma/client";

const createHost = async (username, password, name, email, phoneNumber, pictureUrl, aboutMe) => {
    const prisma = new PrismaClient();
    const existingHost = await prisma.host.findFirst({
        where: {
            username: username
        }
    });

    if (existingHost) {
        const error = new Error('Host already exists');
        error.code = "HOST_EXISTS";
        throw error;
    }

    return await prisma.host.create({
        data: {
        username,
        password,
        name,
        email,
        phoneNumber,
        pictureUrl,
        aboutMe,
        }
    });
};

export default createHost;