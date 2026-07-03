const crypto = require('crypto');
const env = require('../config/env');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');

const createRazorpayOrder = async (amount, currency = 'INR', receipt = null) => {
  if (env.nodeEnv === 'development' && !env.razorpay.keyId) {
    const mockOrder = {
      id: `order_mock_${Date.now()}`,
      entity: 'order',
      amount: amount * 100,
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      status: 'created',
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000),
    };
    logger.info('--- RAZORPAY MOCK ORDER ---');
    logger.info(JSON.stringify(mockOrder, null, 2));
    logger.info('--- END MOCK ORDER ---');
    return mockOrder;
  }

  if (!env.razorpay.keyId || !env.razorpay.keySecret) {
    throw new AppError('Payment gateway not configured', 500);
  }

  try {
    const Razorpay = require('razorpay');
    const instance = new Razorpay({
      key_id: env.razorpay.keyId,
      key_secret: env.razorpay.keySecret,
    });

    const options = {
      amount: amount * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);
    logger.info(`Razorpay order created: ${order.id}`);
    return order;
  } catch (err) {
    logger.error(`Razorpay order creation failed: ${err.message}`);
    throw new AppError('Failed to create payment order', 500);
  }
};

const verifyPayment = (orderId, paymentId, signature) => {
  if (!orderId || !paymentId || !signature) {
    throw new AppError('Missing payment verification parameters', 400);
  }

  const expectedSignature = crypto
    .createHmac('sha256', env.razorpay.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  if (expectedSignature !== signature) {
    logger.warn(`Payment signature mismatch for order: ${orderId}`);
    throw new AppError('Payment verification failed - signature mismatch', 400);
  }

  logger.info(`Payment verified successfully: ${paymentId}`);
  return { verified: true, orderId, paymentId };
};

const processRefund = async (paymentId, amount = null) => {
  if (env.nodeEnv === 'development' && !env.razorpay.keyId) {
    const mockRefund = {
      id: `rfnd_mock_${Date.now()}`,
      payment_id: paymentId,
      amount: amount ? amount * 100 : 0,
      status: 'processed',
      created_at: Math.floor(Date.now() / 1000),
    };
    logger.info('--- RAZORPAY MOCK REFUND ---');
    logger.info(JSON.stringify(mockRefund, null, 2));
    logger.info('--- END MOCK REFUND ---');
    return mockRefund;
  }

  if (!env.razorpay.keyId || !env.razorpay.keySecret) {
    throw new AppError('Payment gateway not configured', 500);
  }

  try {
    const Razorpay = require('razorpay');
    const instance = new Razorpay({
      key_id: env.razorpay.keyId,
      key_secret: env.razorpay.keySecret,
    });

    const refundOptions = {};
    if (amount) {
      refundOptions.amount = amount * 100;
    }

    const refund = await instance.payments.refund(paymentId, refundOptions);
    logger.info(`Refund processed: ${refund.id} for payment: ${paymentId}`);
    return refund;
  } catch (err) {
    logger.error(`Refund failed for payment ${paymentId}: ${err.message}`);
    throw new AppError('Failed to process refund', 500);
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
  processRefund,
};
