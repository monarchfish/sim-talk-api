const socketIO = require('socket.io')
const UserModel = require('../models/user')

let io = null

function initSocket(server) {
	io = socketIO(server, {
		cors: true,
	})

	io.on('connection', (socket) => {
		const token = socket.handshake.query.token
		console.log('Client connected with token: ', token)

		const user = UserModel.findByToken(token)
		if (user) {
			user.socketId = socket.id
			user.disconnect = false
			user.update()
		} else {
			socket.emit('message', { msg: 'token无效' })
			socket.disconnect(true)
		}

		socket.on('message', ({ msg }) => {
			console.log(msg)
		})

		socket.on('disconnect', () => {
			console.log('A user disconnect.')
			user.socketId = null
			user.disconnect = true
			io.emit('userLeave', {
				userInfo: {
					name: user.name,
				},
			})
		})
	})
}

function sendNewuser(userInfo) {
	if (!io) return

	io.emit('newuser', { userInfo })
}

module.exports = {
	initSocket,
	sendNewuser,
}
