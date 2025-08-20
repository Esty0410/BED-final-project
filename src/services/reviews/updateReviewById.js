import reviewData from '../../data/reviews.json' with { type: 'json' };

const updateReviewById = (id, updatedReview) => {
    const reviewIndex = reviewData.reviews.findIndex((review) => review.id === id);

    if (reviewIndex === -1) {
        return null;
    }

    const { userId, productId, rating, comment } = updatedReview;

    reviewData.reviews[reviewIndex] = {
        ...reviewData.reviews[reviewIndex],
        userId: userId || reviewData.reviews[reviewIndex].userId,
        productId: productId || reviewData.reviews[reviewIndex].productId,
        rating: rating || reviewData.reviews[reviewIndex].rating,
        comment: comment || reviewData.reviews[reviewIndex].comment,
    };

    return reviewData.reviews[reviewIndex];
};

export default updateReviewById;