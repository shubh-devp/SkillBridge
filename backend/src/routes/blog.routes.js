const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { validate } = require('../middleware/validate');
const { createBlogRules, updateBlogRules } = require('../validators/blog.validator');

router.get('/', blogController.getBlogs);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/', authenticate, authorize('teacher', 'admin'), validate(createBlogRules), blogController.createBlog);
router.patch('/:id', authenticate, authorize('teacher', 'admin'), validate(updateBlogRules), blogController.updateBlog);
router.delete('/:id', authenticate, authorize('admin'), blogController.deleteBlog);
router.post('/:id/like', authenticate, blogController.likeBlog);

module.exports = router;
