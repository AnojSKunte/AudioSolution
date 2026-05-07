const express = require('express');
const router = express.Router();
const razorpayService = require('../razorpay');
const { authenticate, getUserId } = require('../middleware/auth');
const db = require('../db');

/**
 * Create a new subscription
 * POST /api/payments/create-subscription
 */
router.post('/create-subscription', authenticate, async (req, res) => {
  try {
    const { planId } = req.body;
    
    // Create subscription in Razorpay
    const subscription = await razorpayService.createSubscription(
      planId || process.env.RAZORPAY_PLAN_ID
    );

    res.json({
      subscription_id: subscription.id,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Verify payment after checkout
 * POST /api/payments/verify
 */
router.post('/verify', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);
    const { 
      razorpay_payment_id, 
      razorpay_subscription_id, 
      razorpay_signature 
    } = req.body;

    const isValid = razorpayService.verifySignature(
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature
    );

    if (isValid) {
      // Update user status in Database to PRO
      await db.query(
        "UPDATE users SET subscription_status = 'pro' WHERE id = $1",
        [userId]
      );

      res.json({ status: 'success', message: 'Subscription activated. Welcome to Pro!' });
    } else {
      res.status(400).json({ status: 'failure', message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Payment Verification Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Razorpay Webhook
 */
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const event = razorpayService.handleWebhook(req.body, signature);

    if (event.event === 'subscription.activated') {
      // Extract user/subscription info and update DB
    }

    res.json({ status: 'ok' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
