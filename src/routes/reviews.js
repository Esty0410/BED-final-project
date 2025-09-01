import { Router } from 'express';
import getReviews from '../services/reviews/getReviews.js';
import createReview from '../services/reviews/createReview.js';
import getReviewById from '../services/reviews/getReviewById.js';
import deleteReviewById from '../services/reviews/deleteReviewById.js';
import updateReviewById from '../services/reviews/updateReviewById.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const reviews = await getReviews();
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found..."});
        }
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.post("/", authMiddleware, async (req, res) => {
     try {
        const { userId, propertyId, rating, comment } = req.body;
        const newReview = await createReview(userId, propertyId, rating, comment);
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);

        if (!review) {
            return res.status(404).json({ message: ` Review with id ${id} not found...` });
        }
    return res.status(200).json(review);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error :("});
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const review = await deleteReviewById(id);

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
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, rating, comment } = req.body;
        const review = await updateReviewById(id, { userId, propertyId, rating, comment });

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
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

export default router;