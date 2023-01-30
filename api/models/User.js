const uniqueValidator = require('mongoose-unique-validator')
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returndObject) => {
    returndObject.id = returndObject._id
    delete returndObject._id
    delete returndObject.__v

    delete returndObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
