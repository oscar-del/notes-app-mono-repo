const { model, Schema } = require('mongoose')
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returndObject) => {
    returndObject.id = returndObject._id
    delete returndObject._id
    delete returndObject.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
