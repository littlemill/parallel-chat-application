const express = require('express')

const userCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/create', userCtrl.createUser)
router.delete('/del/:id', userCtrl.deleteUser)
router.get('/:id', userCtrl.getUserById)
router.get('/', userCtrl.getUsers)

module.exports = router