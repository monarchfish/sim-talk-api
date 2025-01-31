// 模拟数据库
let userList = [
	{
		id: 1,
		token: '',
		name: '王老大',
		disconnect: false
	},
	{
		id: 2,
		token: '',
		name: '郭先生',
		disconnect: false
	},
	{
		id: 3,
		token: '',
		name: '張小姐',
		disconnect: false
	}
]

class UserModel {
	constructor(param) {
		this.id = Math.floor(Math.random() * 1000000)
		this.token = param.token
		this.name = param.name
		this.socketId = null
		this.disconnect = true
	}

	save() {
		userList.push(this)
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
					id: e.id,
					name: e.name,
				}
			})
	}

	static findById(id) {
		return userList.find(e => e.id === id)
	}

	static findByToken(token) {
		return userList.find(e => e.token === token)
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
