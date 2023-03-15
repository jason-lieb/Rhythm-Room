const router = require('express').Router()
const { Configuration, OpenAIApi } = require('openai')

require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.AI_API,
})

const openai = new OpenAIApi(configuration)

router.get('/', (req, res) => {
  res.send('Hello AI')
})

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
      response_format: 'b64_json'
    })

    const image_url = aiResponse.data.data[0].b64_json

    res.status(200).json({ image_url: image_url })
  } catch (error) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
  }
})

module.exports = router
