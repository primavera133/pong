import mongoose, {Schema} from 'mongoose'

const playerSchema = Schema({
  name: {
    type: String,
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
  games: [{
    id: {
      type: Schema.Types.ObjectId
    },
    gameType: {
      type: String,
      required: true
    },
    opponentId: {
      type: Schema.Types.ObjectId,
      required: false
    }
  }]
})

export default mongoose.model('Player', playerSchema)
