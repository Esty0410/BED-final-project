import reviewData from '../../data/reviews.json' with { type: 'json' };

const deleteReviewById = (id) => {
    const reviewIndex = reviewData.reviews.findIndex(review => review.id === id);

    if (reviewIndex === -1) {
        return null;
    }

    const deletedReview = reviewData.reviews.splice(reviewIndex, 1);
    return deletedReview;
};

export default deleteReviewById;