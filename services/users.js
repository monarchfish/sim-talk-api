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

		const userInfo = {
			id: user.id,
			name: user.name,
		}
	
		sendNewuser(userInfo)
	
		return {
			token: token,
			userInfo: userInfo,
			otherusers: otherusers,
		}
	}

	static list() {
		return UserModel.findAllValidUser()
	}
}

module.exports = UserService