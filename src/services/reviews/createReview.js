import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const createReview = async (userId, propertyId, rating, comment) => {
    try {
        const review = await prisma.review.create({
            data: {
                userId,
                propertyId,
                rating: Number(rating), // zeker maken dat het een int is
                comment,
            },
        });
        return review;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // Foreign key bestaat niet
            if (err.code === "P2003") {
                throw new Error("User or Property not found");
            }
        }
        throw err;
    }
};

export default createReview;