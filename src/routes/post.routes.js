const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');

/**
 * Post Routes
 * Base path: /api/posts
 */

// Create a new post
router.post('/', PostController.createPost);

// Get all posts (with optional query filters: ?userId=xxx or ?providerId=xxx)
router.get('/', PostController.getPosts);

// Get a post by ID
router.get('/:id', PostController.getPostById);

// Update a post
router.put('/:id', PostController.updatePost);

// Like a post (increment likes count)
router.post('/:id/like', PostController.likePost);

// Delete a post
router.delete('/:id', PostController.deletePost);

module.exports = router;
