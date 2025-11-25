const express = require('express');
const { connectDB } = require('./src/config/database');
const registerRoutes = require('./src/routes/index');

const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Logging middleware (optional, for development)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Database connection check middleware
app.use((req, res, next) => {
    // Skip check for health endpoint
    if (req.path === '/health') {
        return next();
    }

    try {
        require('./src/config/database').getDB();
        next();
    } catch (error) {
        res.status(503).json({ error: 'Database not connected' });
    }
});

// Register all routes
registerRoutes(app);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
async function startServer() {
    try {
        // Connect to database first
        await connectDB();

        // Then start the server
        app.listen(port, () => {
            console.log(`\n Server running on port ${port}`);
            console.log(`Health check: http://localhost:${port}/health`);
            console.log(`API endpoints: http://localhost:${port}/api`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();