const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorpayService = {
  /**
   * Create a subscription plan (usually done once via API or Dashboard)
   */
  createPlan: async (name, amount, interval = 'monthly') => {
    return await razorpay.plans.create({
      period: interval, // daily, weekly, monthly, yearly
      interval: 1,
      item: {
        name: name,
        amount: amount * 100, // amount in paise
        currency: 'INR',
        description: `Subscription for ${name}`
      }
    });
  },

  /**
   * Create a subscription for a user
   */
  createSubscription: async (planId, totalCount = 12) => {
    return await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: totalCount,
    });
  },

  /**
   * Verify the payment signature
   */
  verifySignature: (paymentId, orderId, signature) => {
    const text = `${paymentId}|${orderId}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    return generated_signature === signature;
  },

  /**
   * Handle Webhook events
   */
  handleWebhook: (payload, signature) => {
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new Error('Invalid signature');
    }

    // Process events like 'subscription.activated', 'subscription.halted' etc.
    return payload;
  }
};

module.exports = razorpayService;
