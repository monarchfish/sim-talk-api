const UserModel = require('../models/user')
const { sendNewuser } = require('../sockets')

function register(name) {
	const token = Math.floor(Math.random() * 1000000)

	const params = {
		token,
		name,
	}

	const otherusers = UserModel.findAllValidUser()
	const user = new UserModel(params)
	user.save()

	console.log('now platers nums: ', otherusers.length + 1)

	sendNewuser({
		name,
	})

	return {
		token: token,
		userInfo: {
			name,
		},
		otherusers: otherusers,
	}
}

module.exports = {
	register,
}
