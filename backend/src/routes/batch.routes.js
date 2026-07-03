const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batch.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', batchController.getBatches);
router.get('/upcoming', batchController.getUpcomingBatches);
router.get('/:id', batchController.getBatchById);
router.post('/', authenticate, authorize('admin'), batchController.createBatch);
router.patch('/:id', authenticate, authorize('admin'), batchController.updateBatch);
router.delete('/:id', authenticate, authorize('admin'), batchController.deleteBatch);

module.exports = router;
