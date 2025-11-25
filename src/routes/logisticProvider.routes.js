const express = require('express');
const router = express.Router();
const LogisticProviderController = require('../controllers/logisticProvider.controller');

/**
 * Logistic Provider Routes
 * Base path: /api/logistic_providers
 */

// Create a new logistic provider
router.post('/', LogisticProviderController.createProvider);

// Get all logistic providers
router.get('/', LogisticProviderController.getProviders);

// Get a logistic provider by ID
router.get('/:id', LogisticProviderController.getProviderById);

// Update a logistic provider
router.put('/:id', LogisticProviderController.updateProvider);

// Delete a logistic provider
router.delete('/:id', LogisticProviderController.deleteProvider);

module.exports = router;
