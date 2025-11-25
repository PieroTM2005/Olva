const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message.controller');

/**
 * Message Routes
 * Base path: /api/messages
 */

// Create a new message
router.post('/', MessageController.createMessage);

// Get messages (with optional query filters: ?senderId=xxx, ?receiverId=xxx, or ?conversation=id1,id2)
router.get('/', MessageController.getMessages);

// Get a message by ID
router.get('/:id', MessageController.getMessageById);

// Update a message
router.put('/:id', MessageController.updateMessage);

// Mark a message as read
router.patch('/:id/read', MessageController.markAsRead);

// Delete a message
router.delete('/:id', MessageController.deleteMessage);

module.exports = router;
