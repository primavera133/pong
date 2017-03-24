import mongoose, {Schema} from 'mongoose'

const playerSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    min: 8,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  matches: [{
    id: {
      type: Schema.Types.ObjectId
    },
    game: {
      type: String,
      required: true
    },
    opponentId: {
      type: Schema.Types.ObjectId,
      required: false
    }
  }],
  friends: [{
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  }]
}, {
  timestamps: true
})

export default mongoose.model('Player', playerSchema)
