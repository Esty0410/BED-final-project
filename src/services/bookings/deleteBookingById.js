import { PrismaClient, Prisma } from "@prisma/client";

const deleteBookingById = async (id) => {
    const prisma = new PrismaClient();
    try {
        const booking = await prisma.booking.delete({
            where: { id },
        });
        return booking;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                return null;
            }
        }
        throw err;
    }
};

export default deleteBookingById;