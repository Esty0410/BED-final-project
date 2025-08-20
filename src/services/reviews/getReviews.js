import reviewData from '../../data/reviews.json' with { type: 'json' };

const getReviews = () => {
    return reviewData.reviews;
};

export default getReviews;