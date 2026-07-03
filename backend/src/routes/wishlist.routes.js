const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', authenticate, authorize('student'), wishlistController.getWishlist);
router.post('/', authenticate, authorize('student'), wishlistController.addToWishlist);
router.delete('/:courseId', authenticate, authorize('student'), wishlistController.removeFromWishlist);

module.exports = router;
