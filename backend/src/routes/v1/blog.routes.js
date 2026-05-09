const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blogController');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);

// Protected routes (Assuming some auth middleware exists, but I'll add them without for now as per simple setup)
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
