const userService = require('../services/users')

class UserController {
	static register(ctx) {
		const { name } = ctx.request.body
		console.log('new register username: ', name)
		
		ctx.body = userService.register(name)
	}

	static list(ctx) {
		ctx.body = userService.list()
	}
}

module.exports = UserController
