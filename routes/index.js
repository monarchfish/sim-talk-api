const router = require('koa-router')()

const userCtrl = require('../controllers/users')

router.get('/users', userCtrl.list)

router.post('/users/register', userCtrl.register)

router.allowedMethods()

module.exports = router
