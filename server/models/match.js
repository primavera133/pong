import mongoose, {Schema} from 'mongoose'

const matchSchema = Schema({
  game: {
    gameId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  playerOne: {
    playerId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String
    }
  },
  playerTwo: {
    playerId: {
      type: Schema.Types.ObjectId,
      required: false
    },
    name: {
      type: String
    },
    accepted: {
      type: Boolean,
      default: false
    }
  }
})

export default mongoose.model('Match', matchSchema)
