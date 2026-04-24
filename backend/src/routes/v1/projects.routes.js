const express = require('express');
const { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../../controllers/projects.controller');
const { protect, restrictTo } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router
  .route('/')
  .get(getProjects)
  .post(createProject);

router
  .route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
