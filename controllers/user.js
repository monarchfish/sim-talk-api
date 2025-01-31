const userService = require('../services/user')

class UserController {
	register(ctx) {
		const { name } = ctx.request.body
		console.log('new register username: ', name)
		const user = userService.register(name)
		ctx.body = user
	}
}

module.exports = new UserController()
