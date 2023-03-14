const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const path = require('path')
const db = require('./config/connection')
const routes = require('./routes')
const cors = require('cors')

const { authMiddleware } = require('./utils/auth')

require('dotenv').config()

const { typeDefs, resolvers } = require('./schemas')

const app = express()
const PORT = process.env.PORT || 5500

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)
console.log(process.env.NODE_ENV)
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  console.log('running production')
  app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start()
  server.applyMiddleware({ app })
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`)
      console.log(`GraphQL server running on port:${PORT}${server.graphqlPath}`)
    })
  })
}

startApolloServer(typeDefs, resolvers)
