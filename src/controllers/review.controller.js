const { ObjectId } = require('mongodb');
const ReviewModel = require('../models/review.model');

/**
 * Review Controller - Business logic for review operations
 */
class ReviewController {
    /**
     * Create a new review
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async createReview(req, res) {
        try {
            const { userId, providerId, title, content, rating, created_at } = req.body;

            // Basic validation
            if (!userId || !providerId || !rating) {
                return res.status(400).json({
                    error: 'UserId, providerId, and rating are required'
                });
            }

            // Validate rating range
            if (rating < 1 || rating > 5) {
                return res.status(400).json({
                    error: 'Rating must be between 1 and 5'
                });
            }

            const id = await ReviewModel.create({
                userId,
                providerId,
                title,
                content,
                rating,
                created_at
            });

            res.status(201).json({
                message: 'Review created successfully',
                id
            });
        } catch (error) {
            console.error('Error creating review:', error);
            res.status(500).json({ error: 'Error creating review' });
        }
    }

    /**
     * Get all reviews
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getReviews(req, res) {
        try {
            const reviews = await ReviewModel.findAll();
            res.status(200).json(reviews);
        } catch (error) {
            console.error('Error getting reviews:', error);
            res.status(500).json({ error: 'Error getting reviews' });
        }
    }

    /**
     * Get a review by ID
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getReviewById(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const review = await ReviewModel.findById(id);

            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }

            res.status(200).json(review);
        } catch (error) {
            console.error('Error getting review:', error);
            res.status(500).json({ error: 'Error getting review' });
        }
    }

    /**
     * Update a review
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async updateReview(req, res) {
        try {
            const { id } = req.params;
            const { userId, providerId, title, content, rating, created_at } = req.body;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            // Validate rating if provided
            if (rating && (rating < 1 || rating > 5)) {
                return res.status(400).json({
                    error: 'Rating must be between 1 and 5'
                });
            }

            const result = await ReviewModel.update(id, {
                userId,
                providerId,
                title,
                content,
                rating,
                created_at
            });

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Review not found' });
            }

            res.status(200).json({ message: 'Review updated successfully' });
        } catch (error) {
            console.error('Error updating review:', error);
            res.status(500).json({ error: 'Error updating review' });
        }
    }

    /**
     * Delete a review
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async deleteReview(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await ReviewModel.delete(id);

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Review not found' });
            }

            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            console.error('Error deleting review:', error);
            res.status(500).json({ error: 'Error deleting review' });
        }
    }
}

module.exports = ReviewController;
