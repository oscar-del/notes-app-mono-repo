// const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { server } = require('../index')
// const User = require('../models/User')
// const { api, getUsers } = require('./helpers')

/* describe('Creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'oscarroot', passwordHash })

    await user.save()
  })

  test('works as expectd creating a fresh username',
    async () => {
      const userAtStart = await getUsers()

      const newUser = {
        username: 'oesantaa',
        name: 'Oscar',
        password: 'OESANTA'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await getUsers()

      expect(usersAtEnd).toHaveLength(userAtStart.length + 1)
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

  test('creation fails with proper statuscode and message if user is already take',
    async () => {
      const userAtStart = await getUsers()

      const newUser = {
        username: 'oscarroot',
        name: 'Oscar',
        password: 'Oscar'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(result.body)

      expect(result.body.error.errors.username.message).toContain('`username` to be unique')

      const usersAtEnd = await getUsers()
      expect(usersAtEnd).toHaveLength(userAtStart.length)
    })
}) */

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
