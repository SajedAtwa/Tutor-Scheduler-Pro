const express = require('express');
const router = express.Router();

// Import your controllers
const customerController = require('../controllers/customerController');

// Import middleware
const authMiddleware = require('../middlewares/authMiddleware');
const { notFound, errorHandler } = require('../middlewares/errorMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Route to register a new customer (Public access)
router.post('/signup', customerController.registerCustomer, errorHandler);

// Route to login (Public access)
router.post('/login', customerController.loginCustomer, errorHandler);

// Route to fetch class options (Requires authentication)
router.get('/classes/:serviceType', authMiddleware, customerController.getClassOptions, errorHandler);

// Route to get session times for a specific class (Requires authentication)
router.get('/sessions/:classType', authMiddleware, customerController.getSessionOptions, errorHandler);

// Route to process payment and booking (Requires authentication and specific roles if necessary)
router.post('/payment', authMiddleware, customerController.processPayment, errorHandler);

// Handle 404 Not Found
router.use(notFound);

// General error handler
router.use(errorHandler);

module.exports = router;

