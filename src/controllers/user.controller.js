const { ObjectId } = require('mongodb');
const UserModel = require('../models/user.model');

/**
 * User Controller - Business logic for user operations
 */
class UserController {
    /**
     * Create a new user
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async createUser(req, res) {
        try {
            const { username, full_name, email, registered_date } = req.body;

            // Basic validation
            if (!username || !email) {
                return res.status(400).json({
                    error: 'Username and email are required'
                });
            }

            const id = await UserModel.create({
                username,
                full_name,
                email,
                registered_date
            });

            res.status(201).json({
                message: 'User created successfully',
                id
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }

    /**
     * Get all users
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getUsers(req, res) {
        try {
            const users = await UserModel.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
    }

    /**
     * Get a user by ID
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getUserById(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const user = await UserModel.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    /**
     * Update a user
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, full_name, email, registered_date } = req.body;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await UserModel.update(id, {
                username,
                full_name,
                email,
                registered_date
            });

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Error updating user' });
        }
    }

    /**
     * Delete a user
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await UserModel.delete(id);

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Error deleting user' });
        }
    }
}

module.exports = UserController;
