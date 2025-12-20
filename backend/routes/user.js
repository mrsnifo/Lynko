const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:username', userController.getUser);
router.put('/information', auth, userController.updateUser);

module.exports = router;