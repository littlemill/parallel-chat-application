const Chat = require('../models/chat-model')

createChat = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a chat',
        })
    }

    const chat = new Chat(body)

    if (!chat) {
        return res.status(400).json({ success: false, error: err })
    }

    chat
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Chat created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Chat not created!',
            })
        })
}

updateChat = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Chat.findOne({ _id: req.params.id }, (err, chat) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        chat.user = body.user
        chat.time = body.time
        chat.message = body.message
        chat
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: chat._id,
                    message: 'Chat updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Chat not updated!',
                })
            })
    })
}

deleteChat = async (req, res) => {
    await Chat.findOneAndDelete({ _id: req.params.id }, (err, chat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!chat) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getChatById = async (req, res) => {
    await Chat.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!chat) {
            return res
                .status(404)
                .json({ success: false, error: `Chat not found` })
        }
        return res.status(200).json({ success: true, data: chat })
    }).catch(err => console.log(err))
}

getChats = async (req, res) => {
    await Chat.find({}, (err, chats) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!chats.length) {
            return res
                .status(404)
                .json({ success: false, error: `Chat not found` })
        }
        return res.status(200).json({ success: true, data: chats })
    }).catch(err => console.log(err))
}

module.exports = {
    createChat,
    updateChat,
    deleteChat,
    getChats,
    getChatById,
}