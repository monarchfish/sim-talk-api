const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const http = require('http')
const cors = require('@koa/cors')
const static = require('koa-static')
const path = require('path')
const os = require('os')
const net = require('net')

const router = require('./routes')

const app = new Koa()

app.use(static(path.join(__dirname, 'public')))
app.use(bodyParser())
app.use(cors())

const server = http.createServer(app.callback())

const { initSocket } = require('./sockets')
initSocket(server)

app.use(router.routes())

function getLocalIPs() {
	const interfaces = os.networkInterfaces()
	const ips = []

	for (const key in interfaces) {
		const iface = interfaces[key]
		for (let i = 0; i < iface.length; i++) {
			const { address, family, internal } = iface[i]
			if (family === 'IPv4') {
				ips.push(address)
			}
		}
	}

	return ips
}

const port = 3000
const localIPs = getLocalIPs()

server.listen(port, () => {
	console.log('Server is listening on:')
	localIPs.forEach((ip) => {
		console.log(`- http://${ip}:${port}`)
	})
})
