require('dotenv').config()
require('./mongo') // Conexion con mongo

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')

const logger = require('./loggerMiddleware')
const notFount = require('./middleware/notFount')
const handleErros = require('./middleware/handleErros')
const userExtractor = require('./middleware/userExtractor')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const User = require('./models/User')

app.use(cors())
app.use(express.json())
app.use(logger)

app.use(express.static('../app/build'))

Sentry.init({
  dsn: 'https://3f203376090b4aae98b26f12114bd74f@o4504414732615680.ingest.sentry.io/4504414738579456',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.get('/api/notes', async (request, response) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(notes)
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then(note => {
      if (note) return response.json(note)
      response.status(404).end()
    })
    .catch(err => next(err))
})

app.put('/api/notes/:id', userExtractor, (req, res, next) => {
  const { id } = req.params
  const note = req.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findOneAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      res.json(result)
    })
})

app.delete('/api/notes/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params

  const respuesta = await Note.findByIdAndDelete(id)
  if (respuesta === null) return res.sendStatus(404)
  res.status(204).end()
})

app.post('/api/notes/', userExtractor, async (req, res, next) => {
  const {
    content,
    important = false
  } = req.body

  // sacar userId de request
  const { userId } = req

  const user = await User.findById(userId)

  if (!content) {
    return res.status(400).json({
      error: 'require "content" field is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })

  try {
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.json(savedNote)
  } catch (error) {
    next(error)
  }
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(notFount)

app.use(Sentry.Handlers.errorHandler())

app.use(handleErros)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`)
})

module.exports = { app, server }
