const express = require('express')

const chatCtrl = require('../controllers/chat-ctrl')

const router = express.Router()

router.post('/chat', chatCtrl.createChat)
router.put('/chat/:id', chatCtrl.updateCbat)
router.delete('/chat/:id', chatCtrk.deleteChat)
router.get('/chat/:id', chatCtrl.getChatById)
router.get('/chats', chatCtrl.getChats)

module.exports = router