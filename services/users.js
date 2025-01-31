const UserModel = require('../models/users')
const { sendNewuser } = require('../sockets')

class UserService {
	static register(name) {
		const token = Math.floor(Math.random() * 1000000).toString()
	
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

	static list() {
		return UserModel.findAllValidUser()
	}
}

module.exports = UserService