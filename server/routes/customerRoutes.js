const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { notFound, errorHandler } = require('../middlewares/errorMiddleware');

// Public
router.post('/signup', customerController.registerCustomer);
router.post('/login', customerController.loginCustomer);

// Protected
router.get(
  '/classes/:serviceType',
  authMiddleware,
  roleMiddleware(['customer']),
  customerController.getClassOptions
);

router.get(
  '/sessions/:classType',
  authMiddleware,
  roleMiddleware(['customer']),
  customerController.getSessionOptions
);

router.post(
  '/payment',
  authMiddleware,
  roleMiddleware(['customer']),
  customerController.processPayment
);

// 404 + error handler at end
router.use(notFound);
router.use(errorHandler);

module.exports = router;

