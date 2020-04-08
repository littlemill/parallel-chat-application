const express = require('express')

const chatCtrl = require('../controllers/chat-ctrl')

const router = express.Router()

router.post('/create', chatCtrl.createChat)
router.delete('/del/:id', chatCtrl.deleteChat)
router.get('/:id', chatCtrl.getChatById)
router.get('/', chatCtrl.getChats)

module.exports = router