// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})

const app = vertex.express() // initialize app

app.use((req, res, next) => {
	const timestamp = new Date()
	req.timestamp = timestamp.toString()
	next()
})

// import routes
const index = require('./routes/index')
const register = require('./routes/register')
const api = require('./routes/api')

// set routes
app.use('/', index)
app.use('/register', register)
app.use('/api', api) // sample API Routes


module.exports = app