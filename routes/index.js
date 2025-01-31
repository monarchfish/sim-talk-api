const router = require('koa-router')()

const userCtrl = require('../controllers/user')

router.post('/user/register', userCtrl.register)

router.allowedMethods()

module.exports = router
