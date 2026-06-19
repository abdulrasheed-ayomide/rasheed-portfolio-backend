const express = require('express');

const router = express.Router();

const {
  getGithubData
} = require('../controllers/githubController');

router.get('/', getGithubData);

module.exports = router;