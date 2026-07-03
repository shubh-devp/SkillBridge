const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { createContactRules } = require('../validators/contact.validator');

router.post('/', validate(createContactRules), contactController.createContact);
router.get('/', authenticate, authorize('admin'), contactController.getContacts);
router.patch('/:id/status', authenticate, authorize('admin'), contactController.updateContactStatus);

module.exports = router;
