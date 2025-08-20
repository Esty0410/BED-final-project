import { v4 as uuidv4 } from 'uuid';
import reviewData from '../../data/reviews.json' with { type: 'json' };

const createReview = (userId, propertyId, rating, comment) => {
    const newReview = {
        id: uuidv4(),
        userId,
        propertyId,
        rating,
        comment,
    };

    reviewData.reviews.push(newReview);
    return newReview;
};

export default createReview;