import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
    const prisma = new PrismaClient();
    console.log("Updating booking with id:", id, "with data:", updatedBooking);
        const bestaatBooking = await prisma.booking.findUnique({
        where: { id },
    });
    if (!bestaatBooking) {
        console.log(`Booking with id ${id} does not exist.`);
        return null;
    };
    const booking = await prisma.booking.updateMany({
        where: { id },
        data: updatedBooking,
    });

    return booking;
};

export default updateBookingById;