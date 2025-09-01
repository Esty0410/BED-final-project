import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
    const prisma = new PrismaClient();
    const booking = await prisma.booking.updateMany({
        where: { id },
        data: updatedBooking,
    });

    return booking;
};

export default updateBookingById;