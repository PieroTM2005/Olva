const { ObjectId } = require('mongodb');
const MessageModel = require('../models/message.model');

/**
 * Message Controller - Business logic for message operations
 */
class MessageController {
    /**
     * Create a new message
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async createMessage(req, res) {
        try {
            const { senderId, receiverId, subject, content } = req.body;

            // Basic validation
            if (!senderId || !receiverId || !content) {
                return res.status(400).json({
                    error: 'SenderId, receiverId, and content are required'
                });
            }

            const id = await MessageModel.create({
                senderId,
                receiverId,
                subject,
                content
            });

            res.status(201).json({
                message: 'Message sent successfully',
                id
            });
        } catch (error) {
            console.error('Error creating message:', error);
            res.status(500).json({ error: 'Error al crear el mensaje' });
        }
    }

    /**
     * Get messages with optional filtering
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getMessages(req, res) {
        try {
            const { senderId, receiverId, conversation } = req.query;

            let messages;
            if (conversation) {
                // Get conversation between two users
                const [userId1, userId2] = conversation.split(',');
                if (!userId1 || !userId2) {
                    return res.status(400).json({
                        error: 'Conversation query requires two user IDs separated by comma'
                    });
                }
                messages = await MessageModel.findConversation(userId1, userId2);
            } else if (senderId) {
                messages = await MessageModel.findBySenderId(senderId);
            } else if (receiverId) {
                messages = await MessageModel.findByReceiverId(receiverId);
            } else {
                messages = await MessageModel.findAll();
            }

            res.status(200).json(messages);
        } catch (error) {
            console.error('Error getting messages:', error);
            res.status(500).json({ error: 'Error al obtener los mensajes' });
        }
    }

    /**
     * Get a message by ID
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getMessageById(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const message = await MessageModel.findById(id);

            if (!message) {
                return res.status(404).json({ message: 'Mensaje no encontrado' });
            }

            res.status(200).json(message);
        } catch (error) {
            console.error('Error getting message:', error);
            res.status(500).json({ error: 'Error al obtener el mensaje' });
        }
    }

    /**
     * Update a message
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async updateMessage(req, res) {
        try {
            const { id } = req.params;
            const { subject, content } = req.body;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await MessageModel.update(id, { subject, content });

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Mensaje no encontrado' });
            }

            res.status(200).json({ message: 'Mensaje actualizado exitosamente' });
        } catch (error) {
            console.error('Error updating message:', error);
            res.status(500).json({ error: 'Error al actualizar el mensaje' });
        }
    }

    /**
     * Mark a message as read
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async markAsRead(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await MessageModel.markAsRead(id);

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Mensaje no encontrado' });
            }

            res.status(200).json({ message: 'Mensaje marcado como leído' });
        } catch (error) {
            console.error('Error marking message as read:', error);
            res.status(500).json({ error: 'Error al marcar el mensaje como leído' });
        }
    }

    /**
     * Delete a message
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async deleteMessage(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await MessageModel.delete(id);

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Mensaje no encontrado' });
            }

            res.status(200).json({ message: 'Mensaje eliminado exitosamente' });
        } catch (error) {
            console.error('Error deleting message:', error);
            res.status(500).json({ error: 'Error al eliminar el mensaje' });
        }
    }
}

module.exports = MessageController;
