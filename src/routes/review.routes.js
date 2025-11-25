const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');

/**
 * Review Routes
 * Base path: /api/reviews
 */

// Create a new review
router.post('/', ReviewController.createReview);

// Get all reviews
router.get('/', ReviewController.getReviews);

// Get a review by ID
router.get('/:id', ReviewController.getReviewById);

// Update a review
router.put('/:id', ReviewController.updateReview);

// Delete a review
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;
