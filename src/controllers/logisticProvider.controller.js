const { ObjectId } = require('mongodb');
const LogisticProviderModel = require('../models/logisticProvider.model');

/**
 * Logistic Provider Controller - Business logic for provider operations
 */
class LogisticProviderController {
    /**
     * Create a new logistic provider
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async createProvider(req, res) {
        try {
            const { company_name, ruc, contact_email, services } = req.body;

            // Basic validation
            if (!company_name || !ruc) {
                return res.status(400).json({
                    error: 'Company name and RUC are required'
                });
            }

            const id = await LogisticProviderModel.create({
                company_name,
                ruc,
                contact_email,
                services
            });

            res.status(201).json({
                message: 'Provider created successfully',
                id
            });
        } catch (error) {
            console.error('Error creating provider:', error);
            res.status(500).json({ error: 'Error creating provider' });
        }
    }

    /**
     * Get all logistic providers
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getProviders(req, res) {
        try {
            const providers = await LogisticProviderModel.findAll();
            res.status(200).json(providers);
        } catch (error) {
            console.error('Error getting providers:', error);
            res.status(500).json({ error: 'Error getting providers' });
        }
    }

    /**
     * Get a logistic provider by ID
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async getProviderById(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const provider = await LogisticProviderModel.findById(id);

            if (!provider) {
                return res.status(404).json({ message: 'Provider not found' });
            }

            res.status(200).json(provider);
        } catch (error) {
            console.error('Error getting provider:', error);
            res.status(500).json({ error: 'Error getting provider' });
        }
    }

    /**
     * Update a logistic provider
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async updateProvider(req, res) {
        try {
            const { id } = req.params;
            const { company_name, ruc, contact_email, services } = req.body;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await LogisticProviderModel.update(id, {
                company_name,
                ruc,
                contact_email,
                services
            });

            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Provider not found' });
            }

            res.status(200).json({ message: 'Provider updated successfully' });
        } catch (error) {
            console.error('Error updating provider:', error);
            res.status(500).json({ error: 'Error updating provider' });
        }
    }

    /**
     * Delete a logistic provider
     * @param {Request} req - Express request
     * @param {Response} res - Express response
     */
    static async deleteProvider(req, res) {
        try {
            const { id } = req.params;

            // Validate ObjectId
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }

            const result = await LogisticProviderModel.delete(id);

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Provider not found' });
            }

            res.status(200).json({ message: 'Provider deleted successfully' });
        } catch (error) {
            console.error('Error deleting provider:', error);
            res.status(500).json({ error: 'Error deleting provider' });
        }
    }
}

module.exports = LogisticProviderController;
