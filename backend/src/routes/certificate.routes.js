const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.post('/', authenticate, authorize('teacher', 'admin'), certificateController.generateCertificate);
router.get('/my', authenticate, authorize('student'), certificateController.getUserCertificates);
router.get('/verify/:certificateId', certificateController.verifyCertificate);

module.exports = router;
