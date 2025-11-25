const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

/**
 * User Routes
 * Base path: /api/users
 */

// Create a new user
router.post('/', UserController.createUser);

// Get all users
router.get('/', UserController.getUsers);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Update a user
router.put('/:id', UserController.updateUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

module.exports = router;
