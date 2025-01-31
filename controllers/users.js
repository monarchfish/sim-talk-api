const userService = require('../services/users')

class UserController {
	static register(ctx) {
		const { name } = ctx.request.body
		console.log('new register username: ', name)
		const user = userService.register(name)
		ctx.body = user
	}

	static list(ctx) {
		const users = userService.list()
		ctx.body = users
	}
}

module.exports = UserController
