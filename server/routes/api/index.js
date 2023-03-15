const router = require('express').Router()
const auth = require('./auth')
const openai = require('./openai')

router.use('/auth', auth)
router.use('/openai',openai)

module.exports = router
