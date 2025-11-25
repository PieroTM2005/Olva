const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const COLLECTION_NAME = 'users';

/**
 * User Model - Data access layer for users
 */
class UserModel {
    /**
     * Creates a new user
     * @param {Object} userData - User data
     * @returns {Promise<ObjectId>} Inserted user ID
     */
    static async create(userData) {
        const db = getDB();
        const { username, full_name, email, registered_date } = userData;
        const result = await db.collection(COLLECTION_NAME).insertOne({
            username,
            full_name,
            email,
            registered_date
        });
        return result.insertedId;
    }

    /**
     * Finds all users
     * @returns {Promise<Array>} Array of users
     */
    static async findAll() {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find().toArray();
    }

    /**
     * Finds a user by ID
     * @param {string} id - User ID
     * @returns {Promise<Object|null>} User object or null
     */
    static async findById(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
    }

    /**
     * Updates a user
     * @param {string} id - User ID
     * @param {Object} userData - Updated user data
     * @returns {Promise<Object>} Update result
     */
    static async update(id, userData) {
        const db = getDB();
        const { username, full_name, email, registered_date } = userData;
        return await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { username, full_name, email, registered_date } }
        );
    }

    /**
     * Deletes a user
     * @param {string} id - User ID
     * @returns {Promise<Object>} Delete result
     */
    static async delete(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = UserModel;
