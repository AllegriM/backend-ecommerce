const express = require('express');
const router = express.Router();
const chatControllers = require('../../controllers/chat.controllers');

router.get('/', chatControllers.getChat);
router.post('/', chatControllers.saveMessage);
router.get('/:email', chatControllers.getChatByEmail);

module.exports = router;