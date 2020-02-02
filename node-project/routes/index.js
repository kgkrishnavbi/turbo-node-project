// Full Documentation - https://docs.turbo360.co
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const profiles = {
	gopal: {
		username:'gopal',
		name: 'Gopal Krishna',
		image: '/images/gopal.jpg',
		company: 'Visual BI',
		languages: ['JavaScript', 'PHP', 'Python']
	},
	sjobs: {
		username:'sjobs',
		name: 'Steve Jobs',
		image: '/images/sjobs.jpg',
		company: 'Apple',
		languages: ['Objective-C', 'swift', 'C++']
	},
	bgates: {
		username:'bgates',
		name: 'Bill Gates',
		image: '/images/bgates.jpg',
		company: 'Microsoft',
		languages: ['C', 'C#', 'Java']
	}
}

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

router.get('/profiles', (req, res) => {
	const keys = Object.keys(profiles)
	const list = []
	keys.forEach(key => {
		list.push(profiles[key])
	})

	const data = {
		profiles: list,
		timestamp: req.timestamp
	}

	res.render('profiles', data)
})

router.post('/addprofile', (req, res) => {
	const body= req.body
	body['languages'] = req.body.languages.split(', ')

	profiles[body.username] = body

	res.redirect('/profile/' + body.username)
})

router.get('/query', (req,res) => {
	const name = req.query.name
	const occupation = req.query.occupation

	const data = {name,occupation}
	res.render('profile', data)
})

router.get('/:path', (req, res) => {
	const path = req.params.path 
	res.json({
		data:path
	})
})

router.get('/:profile/:username', (req, res) => {
	const profile = req.params.profile
	const username = req.params.username 
	const currentProfile = profiles[username]
	currentProfile.timestamp = req.timestamp

	if(currentProfile == null){
		res.json({
			confirmation:'fail',
			message:'Profile ' + username + ' not found'
		})
		return
	}

	res.render('profile', currentProfile)
})


router.post('/post', (req, res) => {
	const body = req.body
	res.json({
		confirmation:'success',
		data: body
	})
})
module.exports = router
