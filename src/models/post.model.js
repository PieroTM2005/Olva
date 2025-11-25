const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const COLLECTION_NAME = 'posts';

/**
 * Post Model - Data access layer for posts
 * Posts are content created by users about logistic providers or general topics
 */
class PostModel {
    /**
     * Creates a new post
     * @param {Object} postData - Post data
     * @returns {Promise<ObjectId>} Inserted post ID
     */
    static async create(postData) {
        const db = getDB();
        const {
            userId,
            providerId,
            title,
            content,
            images,
            tags,
            likes,
            created_at
        } = postData;

        const result = await db.collection(COLLECTION_NAME).insertOne({
            userId,
            providerId: providerId || null, // Optional: link to a specific provider
            title,
            content,
            images: images || [],
            tags: tags || [],
            likes: likes || 0,
            created_at: created_at || new Date()
        });
        return result.insertedId;
    }

    /**
     * Finds all posts
     * @returns {Promise<Array>} Array of posts
     */
    static async findAll() {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find().sort({ created_at: -1 }).toArray();
    }

    /**
     * Finds a post by ID
     * @param {string} id - Post ID
     * @returns {Promise<Object|null>} Post object or null
     */
    static async findById(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
    }

    /**
     * Finds all posts by a specific user
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Array of posts
     */
    static async findByUserId(userId) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find({ userId }).sort({ created_at: -1 }).toArray();
    }

    /**
     * Finds all posts about a specific provider
     * @param {string} providerId - Provider ID
     * @returns {Promise<Array>} Array of posts
     */
    static async findByProviderId(providerId) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find({ providerId }).sort({ created_at: -1 }).toArray();
    }

    /**
     * Updates a post
     * @param {string} id - Post ID
     * @param {Object} postData - Updated post data
     * @returns {Promise<Object>} Update result
     */
    static async update(id, postData) {
        const db = getDB();
        const { title, content, images, tags } = postData;
        return await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, content, images, tags, updated_at: new Date() } }
        );
    }

    /**
     * Increments the likes count for a post
     * @param {string} id - Post ID
     * @returns {Promise<Object>} Update result
     */
    static async incrementLikes(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $inc: { likes: 1 } }
        );
    }

    /**
     * Deletes a post
     * @param {string} id - Post ID
     * @returns {Promise<Object>} Delete result
     */
    static async delete(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = PostModel;
