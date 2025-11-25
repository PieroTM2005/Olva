const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const COLLECTION_NAME = 'logistic_providers';

/**
 * Logistic Provider Model - Data access layer for logistic providers
 */
class LogisticProviderModel {
    /**
     * Creates a new logistic provider
     * @param {Object} providerData - Provider data
     * @returns {Promise<ObjectId>} Inserted provider ID
     */
    static async create(providerData) {
        const db = getDB();
        const { company_name, ruc, contact_email, services } = providerData;
        const result = await db.collection(COLLECTION_NAME).insertOne({
            company_name,
            ruc,
            contact_email,
            services
        });
        return result.insertedId;
    }

    /**
     * Finds all logistic providers
     * @returns {Promise<Array>} Array of providers
     */
    static async findAll() {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).find().toArray();
    }

    /**
     * Finds a logistic provider by ID
     * @param {string} id - Provider ID
     * @returns {Promise<Object|null>} Provider object or null
     */
    static async findById(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
    }

    /**
     * Updates a logistic provider
     * @param {string} id - Provider ID
     * @param {Object} providerData - Updated provider data
     * @returns {Promise<Object>} Update result
     */
    static async update(id, providerData) {
        const db = getDB();
        const { company_name, ruc, contact_email, services } = providerData;
        return await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { company_name, ruc, contact_email, services } }
        );
    }

    /**
     * Deletes a logistic provider
     * @param {string} id - Provider ID
     * @returns {Promise<Object>} Delete result
     */
    static async delete(id) {
        const db = getDB();
        return await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = LogisticProviderModel;
