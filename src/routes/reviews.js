import { Router } from 'express';
import getReviews from '../services/reviews/getReviews.js';
import createReview from '../services/reviews/createReview.js';
import getReviewById from '../services/reviews/getReviewById.js';
import deleteReviewById from '../services/reviews/deleteReviewById.js';
import updateReviewById from '../services/reviews/updateReviewById.js';
import authMiddleware from '../middleware/advancedAuth.js';

const router = Router();

router.get("/", (req, res) => {
    const reviews = getReviews();
    res.json(reviews);
});

router.post("/", authMiddleware, (req, res) => {
    const { userId, productId, rating, comment } = req.body;
    const newReview = createReview(userId, productId, rating, comment);
    res.status(201).json(newReview)
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const review = getReviewById(id);

    if (!review) {
        res.status(404).json({ message: ` Review with id ${id} not found...` });
    } else {
        res.status(200).json(review);
    }
});

router.delete("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const review = deleteReviewById(id);

    if (review) {
        res.status(200).send({
            message: `Review with id ${id} deleted successfully`,
            review,
        });
    } else {
        res.status(404).json({
            message: `Review with id ${id} was not found...`
        });
    }
});

router.put("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { userId, productId, rating, comment } = req.body;
    const review = updateReviewById(id, { userId, productId, rating, comment });

    if (review) {
        res.status(200).send({
            message: `Review with id ${id} updated successfully`,
            review,
        });
    } else {
        res.status(404).json({
            message: `Review with id ${id} not found...`
        });
    }
});

export default router;