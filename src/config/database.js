const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'db_logistica_social';

let db;

/**
 * Connects to the MongoDB database
 * @returns {Promise<void>}
 */
async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit if database connection fails
    }
}

/**
 * Gets the database instance
 * @returns {Db} MongoDB database instance
 */
function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
}

/**
 * Closes the database connection
 * @returns {Promise<void>}
 */
async function closeDB() {
    try {
        await client.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
}

module.exports = {
    connectDB,
    getDB,
    closeDB
};
