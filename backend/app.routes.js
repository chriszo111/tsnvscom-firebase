var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({isActive: true, status: 'online'})
})

/**
 * Users
 * GET /users/:id
 * POST /users/create
 * PUT /users/update
 * DELETE /users/delete
 */

module.exports = router;