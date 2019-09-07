var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.json({isActive: true, status: 'online'})
})

module.exports = router;