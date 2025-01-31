// 模拟数据库
const usersMap = {}
let userList = []

class UserModel {
	constructor(param) {
		this.token = param.token
		this.name = param.name
		this.socketId = null
		this.disconnect = true
	}

	save() {
		usersMap[this.token] = this
		userList = Object.values(usersMap)
	}

	update() {
		
	}

	static findAllValidUser() {
		return userList
			.filter((e) => {
				return !e.disconnect
			})
			.map((e) => {
				return {
					name: e.name,
				}
			})
	}

	static findByToken(token) {
		return usersMap[token]
	}

	static findAll(param) {
		const users = userList.filter((e) => {
			for (const key in param) {
				if (param[key] !== e[key]) {
					return false
				}
			}
			return true
		})

		return users
	}
}

module.exports = UserModel
