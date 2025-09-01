import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
    const prisma = new PrismaClient();
    const reviews = prisma.review.findMany();
    
    return reviews;
};

export default getReviews;