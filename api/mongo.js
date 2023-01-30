const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

mongoose.set('strictQuery', false)
mongoose.connect(connectionString)
  .then(() => {
    console.log('Databse connected')
  }).catch(err => {
    console.log(err)
  })

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})
