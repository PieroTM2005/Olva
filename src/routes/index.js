const express = require('express');
const userRoutes = require('./user.routes');
const logisticProviderRoutes = require('./logisticProvider.routes');
const reviewRoutes = require('./review.routes');
const postRoutes = require('./post.routes');
const messageRoutes = require('./message.routes');

/**
 * Central Route Aggregator
 * Registers all API routes with /api prefix
 */
function registerRoutes(app) {
    // Health check endpoint
    app.get('/health', (req, res) => {
        res.status(200).json({
            status: 'OK',
            message: 'Server is running',
            timestamp: new Date().toISOString()
        });
    });

    // API routes
    app.use('/api/users', userRoutes);
    app.use('/api/logistic_providers', logisticProviderRoutes);
    app.use('/api/reviews', reviewRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/messages', messageRoutes);

    // 404 handler for undefined routes
    app.use((req, res) => {
        res.status(404).json({
            error: 'Route not found',
            path: req.path
        });
    });
}

module.exports = registerRoutes;
