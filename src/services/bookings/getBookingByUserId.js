import { PrismaClient } from "@prisma/client";

const getBookingByUserId = async (userId) => {
    const prisma = new PrismaClient();
    const booking = await prisma.booking.findMany({
        where: { userId },
    });

    return booking;
};

export default getBookingByUserId;

