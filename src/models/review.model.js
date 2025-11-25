const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const COLLECTION_NAME = 'reviews';

/**
 * Review Model - Data access layer for reviews
 */
class ReviewModel {
    /**
     * Creates a new review
     * @param {Object} reviewData - Review data
     * @returns {Promise<ObjectId>} Inserted review ID
     */
    static async create(reviewData) {
        const db = getDB();
        const { userId, providerId, title, content, rating, created_at } = reviewData;
        const result = await db.collection(COLLECTION_NAME).insertOne({
            userId,
            providerId,
            title,
            content,
            rating,
            created_at
        });
        return result.insertedId;
    }

    /**
     * Finds all reviews
     * @returns {Promise<Array>} Array of reviews
     */
    static async findAll() {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find().toArray();
    }

    /**
     * Finds a review by ID
     * @param {string} id - Review ID
     * @returns {Promise<Object|null>} Review object or null
     */
    static async findById(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
    }

    /**
     * Updates a review
     * @param {string} id - Review ID
     * @param {Object} reviewData - Updated review data
     * @returns {Promise<Object>} Update result
     */
    static async update(id, reviewData) {
        const db = getDB();
        const { userId, providerId, title, content, rating, created_at } = reviewData;
        return await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { userId, providerId, title, content, rating, created_at } }
        );
    }

    /**
     * Deletes a review
     * @param {string} id - Review ID
     * @returns {Promise<Object>} Delete result
     */
    static async delete(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = ReviewModel;
