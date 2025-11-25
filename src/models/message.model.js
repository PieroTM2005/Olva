const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const COLLECTION_NAME = 'messages';

/**
 * Message Model - Data access layer for messages
 * Messages are private communications between users
 */
class MessageModel {
    /**
     * Creates a new message
     * @param {Object} messageData - Message data
     * @returns {Promise<ObjectId>} Inserted message ID
     */
    static async create(messageData) {
        const db = getDB();
        const {
            senderId,
            receiverId,
            subject,
            content,
            isRead,
            created_at
        } = messageData;

        const result = await db.collection(COLLECTION_NAME).insertOne({
            senderId,
            receiverId,
            subject: subject || '',
            content,
            isRead: isRead || false,
            created_at: created_at || new Date()
        });
        return result.insertedId;
    }

    /**
     * Finds all messages
     * @returns {Promise<Array>} Array of messages
     */
    static async findAll() {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find().sort({ created_at: -1 }).toArray();
    }

    /**
     * Finds a message by ID
     * @param {string} id - Message ID
     * @returns {Promise<Object|null>} Message object or null
     */
    static async findById(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
    }

    /**
     * Finds all messages sent by a specific user
     * @param {string} senderId - Sender user ID
     * @returns {Promise<Array>} Array of messages
     */
    static async findBySenderId(senderId) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find({ senderId }).sort({ created_at: -1 }).toArray();
    }

    /**
     * Finds all messages received by a specific user
     * @param {string} receiverId - Receiver user ID
     * @returns {Promise<Array>} Array of messages
     */
    static async findByReceiverId(receiverId) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find({ receiverId }).sort({ created_at: -1 }).toArray();
    }

    /**
     * Finds conversation between two users
     * @param {string} userId1 - First user ID
     * @param {string} userId2 - Second user ID
     * @returns {Promise<Array>} Array of messages
     */
    static async findConversation(userId1, userId2) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 }
            ]
        }).sort({ created_at: 1 }).toArray();
    }

    /**
     * Updates a message
     * @param {string} id - Message ID
     * @param {Object} messageData - Updated message data
     * @returns {Promise<Object>} Update result
     */
    static async update(id, messageData) {
        const db = getDB();
        const { subject, content } = messageData;
        return await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { subject, content, updated_at: new Date() } }
        );
    }

    /**
     * Marks a message as read
     * @param {string} id - Message ID
     * @returns {Promise<Object>} Update result
     */
    static async markAsRead(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { isRead: true, read_at: new Date() } }
        );
    }

    /**
     * Deletes a message
     * @param {string} id - Message ID
     * @returns {Promise<Object>} Delete result
     */
    static async delete(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = MessageModel;
