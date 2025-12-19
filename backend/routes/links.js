const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', linkController.getLinks);
router.post('/', linkController.createLink);
router.put('/:id', linkController.updateLink);
router.delete('/:id', linkController.deleteLink);

module.exports = router;